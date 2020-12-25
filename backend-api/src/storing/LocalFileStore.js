import fs from "fs";
import Content from "../wrapper/Content.js";

export default class LocalFileStore{
    rootDir() { return "./storage"; }
    getDocId() {
        let indexFile = this.rootDir()+"/.index";
        if (!fs.existsSync(indexFile)){
            fs.writeFileSync(indexFile, "1");
            return 1;
        }
        let curIndex = parseInt(fs.readFileSync(indexFile));
        if (!curIndex) {
            fs.writeFileSync(indexFile, "1");
            return 1;
        }
        fs.writeFileSync(indexFile, curIndex+1);
        return curIndex+1;
    }
    getDocDir(docId){
        let docDir = `${this.rootDir()}/${docId}`;
        if (!fs.existsSync(docDir)){
            fs.mkdirSync(docDir);
        }
        return docDir;
    }

    // Writing
    store(packets, docId) {
        let packetIds = [];
        let docDir = this.getDocDir(docId);
        for (let i = 0; i < packets.length; i++){
            let packet = packets[i];
            packetIds.push(packet.id);
            let dir = `${docDir}/${packet.id}`;
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }
            this.storeQuestions(packet.questions, dir);
        }
        return packetIds;
    }
    storeQuestions(questions, root){
        for (let i = 0; i < questions.length; i++){
            let question = questions[i];
            let dir = `${root}/${question.id}`;
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }
            let contentInfo = this.storeContents(question.contents, dir);
            let infoFile = `${dir}/.info`;
            if (fs.existsSync(infoFile)){
                let mergedQuestion = JSON.parse(fs.readFileSync(infoFile)).merge(contentInfo);
                fs.writeFileSync(infoFile, JSON.stringify(mergedQuestion));
            }
            fs.writeFileSync(infoFile, JSON.stringify(contentInfo));
        }
    }
    storeContents(contents, root){
        let promiseContents = [];
        for (let i = 0; i < contents.length; i++){
            let content = JSON.parse(JSON.stringify(contents[i]));
            switch(content.type){
                case "text":
                case "code":
                    break;
                case "image":
                    fs.writeFileSync(`${root}/${content.id}.jpg`, content.object, "base64");
                    content.type = "url";
                    content.object = `${root}/${content.id}.jpg`;
                    break;
                case "table":
                    fs.writeFileSync(`${root}/${content.id}.json`, JSON.stringify(content.object));
                    content.type = "url";
                    content.object = `${root}/${content.id}.json`;
                    break;
            }
            promiseContents.push(content);
        }
        return promiseContents;
    }

    // Reading
    get(docId, packetIds) {
        let packets = [];
        for (let i = 0; i < packetIds.length; i++){
            let dir = `${this.rootDir()}/${docId}/${packetIds[i]}`;
            let questions = this.getQuestions(dir);
            packets.push(new Packet(questions, packetIds[i]));
        }
        return packets;
    }
    getQuestions(root){
        let questions = [];
        let packetDir = fs.readdirSync(root);
        for (let i = 0; i < packetDir.length; i++){
            let dir = `${dir}/${packetDir[i]}`;
            let contents = this.getContents(dir);
            questions.push(new Question(contents, packetDir[i]));
        }
        return questions;
    }
    getContents(root){
        let contents = [];
        let questionInfo = JSON.parse(fs.readdirSync(`${root}/.info`));
        for (let i = 0; i < questionInfo.contents.length; i++){
            let contentInfo = questionInfo.contents[i];
            contents.push(new Content(contentInfo));
        }
        return contents;
    }

    // Rewriting
    add(packetId, questionId, content) {

    }
    delete(packetId, questionId, contentId) {

    }
    modify(packetId, questionId, contentId, options) {

    }
}