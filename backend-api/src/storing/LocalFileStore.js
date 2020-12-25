import fs from "fs";
import Content from "../wrapper/Content.js";
import Question from "../wrapper/Question.js";
import Packet from "../wrapper/Packet.js";

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
    getDocDir(docId) {
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
                contentInfo = contentInfo.concat(JSON.parse(fs.readFileSync(infoFile)));
            }
            fs.writeFileSync(infoFile, JSON.stringify(contentInfo));
        }
    }
    storeContents(contents, root){
        let promiseContents = [];
        for (let i = 0; i < contents.length; i++){
            let content = JSON.parse(JSON.stringify(contents[i]));
            let qna = content.answer? "a" : "q";
            let dir = `${root}/${qna}`;
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }
            switch(content.type){
                case "text":
                case "code":
                    break;
                case "image":
                    fs.writeFileSync(`${dir}/${content.id}.jpg`, content.object, "base64");
                    content.type = "url";
                    content.object = `${dir}/${content.id}.jpg`;
                    break;
                case "table":
                    fs.writeFileSync(`${dir}/${content.id}.json`, JSON.stringify(content.object));
                    content.type = "url";
                    content.object = `${dir}/${content.id}.json`;
                    break;
            }
            promiseContents.push(content);
        }
        return promiseContents;
    }

    // Reading
    get(docId) {
        let packets = [];
        let dir = this.getDocDir(docId);
        fs.readdirSync(dir).forEach(file => {
            let id = parseInt(file);
            if (id == 0 || id){
                let dir = `${this.rootDir()}/${docId}/${id}`;
                let questions = this.getQuestions(dir);
                packets.push(new Packet(id, questions));
            }
        });
        return packets;
    }
    getQuestions(root){
        let questions = [];
        fs.readdirSync(root).forEach(file => {
            let id = parseInt(file);
            if (id == 0 || id){
                let dir = `${root}/${file}`;
                let contents = this.getContents(dir);
                questions.push(new Question(file, contents));
            }
        });
        return questions;
    }
    getContents(root){
        let contents = [];
        let questionInfo = JSON.parse(fs.readFileSync(`${root}/.info`));
        for (let i = 0; i < questionInfo.length; i++){
            let contentInfo = questionInfo[i];
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