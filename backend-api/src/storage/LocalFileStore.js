import fs from "fs";
import Content from "../wrapper/Content.js";
import Question from "../wrapper/Question.js";
import Packet from "../wrapper/Packet.js";
import QuestionAddress from "../wrapper/QuestionAddress.js";
// replace existing if same id
export default class LocalFileStore{
    rootDir() { return "./local-storage"; }
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
            let infoFile = `${dir}/info.json`;
            if (fs.existsSync(infoFile)){
                let oldContentList = JSON.parse(fs.readFileSync(infoFile));
                for (let i = 0; i < contentInfo.length; i++){
                    for (let j = 0; j < oldContentList.length; j++){
                        if (oldContentList[i].id == contentInfo[i].info && oldContentList[i].answer == contentInfo[i].answer){
                            oldContentList.splice(j,1);
                            j--;
                            break;
                        }
                    }
                }
                contentInfo = contentInfo.concat(oldContentList);
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
    setContent(docId, packetId, questionId, contentId, type, answer, createParents, replace, object) {

        let dir = `${getDocDir(docId)}/${packetId}/${questionId}`;
        let infoFile = `${dir}/.info`;
        if (!fs.existsSync(dir)){
            if (createParents){
                fs.mkdirSync(dir);
                fs.writeFileSync(infoFile, "[]");
            }
            else{
                return false;
            }
        }
        let oldContentList = JSON.parse(fs.readFileSync(infoFile));
        for (let i = 0; i < oldContentList.length; i++){
            if (oldContentList[i].id == contentId && oldContentList[i].answer == answer){
                if (replace){
                    oldContentList.splice(i,1);
                    break;
                }
                else{
                    return false;
                }
            }
        }
        if (fs.existsSync(infoFile)){
            let newContent = this.storeContents([new Content({id: contentId, type: type, answer: answer, object: object})], dir)[0];
            oldContentList = oldContentList.push(newContent);
            fs.writeFileSync(infoFile, JSON.stringify(oldContentList));
            return true;
        }
    }
    // CATEGORIZE
    // append categories of a list of packets
    storePacketsCategories(packets, docId){
        for (let i = 0; i < packets.length; i++){
            let packet = packets[i];
            this.storeQuestionsCategories(packet.questions, packet.id, docId);
        }
    }
    // append categories of a list of questions
    storeQuestionsCategories(questions, packetId, docId){
        for (let i = 0; i < questions.length; i++){
            let question = questions[i];
            this.addCategories(docId, packetId, question.id, question.categories);
        }
    }
    // modify the categorization of a question
    setCategories(docId, packetId, questionId, categories){
        this.clearCategories(docId, packetId, questionId);
        let succeed = this.addCategories(docId, packetId, questionId, categories);
        return succeed;
    }
    // clear all of an address in the categories.json file
    clearCategories(docId, packetId, questionId){
        let categoryStore = JSON.parse(fs.readFileSync(`${getDocDir(docId)}/categories.json`));
        for (let i = 0; i < categoryStore.length; i++){
            this.clearInTopics(categoryStore[i].questions, docId, packetId, questionId);
        }
    }
    // clear all of an address in one single topic
    clearInTopics(questions, docId, packetId, questionId){
        for (let i = 0; i < questions.length; i++){
            if (this.sameQuestion(questions[i], docId, packetId, questionId)){
                questions.splice(i, 1);
                i--;
            }
        }
    }
    // Compare two question are they the same
    sameQuestion(question, docId, packetId, questionId){
        let sameDoc = question.docId == docId;
        let samePacket = question.packetId == packetId;
        let sameQuestion = question.questionId == questionId;
        return sameDoc && samePacket && sameQuestion;
    }
    // Append multiple categories
    addCategories(docId, packetId, questionId, categories){
        let categoryStore = JSON.parse(fs.readFileSync(`${getDocDir(docId)}/categories.json`));
        let address = new QuestionAddress(docId, packetId, questionId);
        for (let i = 0; i < categories.length; i++){
            this.addCategory(categories[i], address, categoryStore);
        }
        fs.writeFileSync(`${getDocDir(docId)}/categories.json`, categoryStore);
    }
    // Append one single category
    addCategory(category, address, categoryStore){
        for (let i = 0; i < categoryStore.length; i++){
            if (categoryStore[i].topic == category){
                categoryStore[i].questions.push(address);
            }
        }
    }
}