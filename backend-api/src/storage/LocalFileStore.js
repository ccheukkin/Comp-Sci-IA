import fs from "fs";
import Content from "../wrapper/Content.js";
import Question from "../wrapper/Question.js";
import Packet from "../wrapper/Packet.js";
import QuestionAddress from "../wrapper/QuestionAddress.js";

export default class LocalFileStore{
    // create and get a new unique document id
    getDocId() {
        let indexFile = this.rootDir()+"/.index";
        // no .index file
        if (!fs.existsSync(indexFile)){
            fs.writeFileSync(indexFile, "0");
            return 0;
        }
        let curIndex = parseInt(fs.readFileSync(indexFile));
        // invalid .index file
        if (!curIndex && curIndex != 0) {
            fs.writeFileSync(indexFile, "0");
            return 0;
        }
        // normal .index file
        fs.writeFileSync(indexFile, curIndex+1);
        return curIndex+1;
    }
    // get the base directory for a document id
    getDocDir(docId) {
        let docDir = `./local-storage/${docId}`;
        if (!fs.existsSync(docDir)){
            fs.mkdirSync(docDir);
        }
        return docDir;
    }

    // EXTRACT
    // store extracted packets
    storePacketExtractions(packets, docId) {
        let docDir = this.getDocDir(docId);
        for (let i = 0; i < packets.length; i++){
            let packet = packets[i];
            let dir = `${docDir}/${packet.id}`;
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }
            this.storeQuestions(packet.questions, dir);
        }
        return packetIds;
    }
    // store extracted questions
    storeQuestionExtractions(questions, root){
        for (let i = 0; i < questions.length; i++){
            let question = questions[i];
            let dir = `${root}/${question.id}`;
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }
            let contentInfo = this.storeContentExtractions(question.contents, dir);
            let infoFile = `${dir}/info.json`;
            if (fs.existsSync(infoFile)){
                let oldContentList = JSON.parse(fs.readFileSync(infoFile));
                contentInfo = mergeInfoMulti(oldContentList, contentInfo, dir);
            }
            fs.writeFileSync(infoFile, JSON.stringify(contentInfo));
        }
    }
    // store non-text contents
    storeContentExtractions(contents, root){
        let promiseContents = JSON.parse(JSON.stringify(contents));
        for (let i = 0; i < promiseContents.length; i++){
            this.storeContentExtraction(promiseContents[i], root);
        }
        return promiseContents;
    }
    // store a single non-text content
    storeContentExtraction(content, root){
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
    }
    // Merging info.json without duplicate
    mergeInfoMulti(info, contents, root){
        let mergedInfo = info;
        for (let i = 0; i < contents.length; i++){
            mergedInfo = this.mergeInfo(mergedInfo, contents[i], root);
        }
        return mergedInfo;
    }
    mergeInfo(info, content, root){
        let infoRemoved = JSON.parse(JSON.stringify(info));
        this.deleteInfo(infoRemoved, content.id, content.answer, root);
        infoRemoved.push(content);
        return infoRemoved;
    }
    deleteInfo(info, contentId, answer, root){
        for (let i = 0; i < info.length; i++){
            let curContent = info[i];
            if (curContent.id == contentId && curContent.answer == answer){
                info.splice(i, 1)
                this.deleteContent(contentId, answer, root);
                i--
            }
        }
    }
    deleteContent(contentId, answer, root){
        let qna = answer? "a" : "q";
        let dir = `${root}/${qna}`;
        fs.readFileSync(dir).forEach(file => {
            let noExtension = file.substring(0, file.lastIndexOf("."));
            if (noExtension == contentId.toString()){
                fs.unlinkSync(`${dir}/${file}`);
            }
        });
    }
    // modify the extraction
    setContent(docId, packetId, questionId, content) {
        let dir = `${getDocDir(docId)}/${packetId}/${questionId}`;
        // docId, packetId and questionId combination does not exist
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, {recursive: true});
        }
        let promiseContent = this.storeContentExtractions([content], dir);
        let infoFile = `${dir}/.info`;
        if (fs.existsSync(infoFile)){
            let contentInfo = JSON.parse(fs.readFileSync(infoFile));
            promiseContent = this.mergeInfoMulti(contentInfo, promiseContent)
        }
        fs.writeFileSync(infoFile, JSON.stringify(promiseContent));
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
    // RETRIEVING
    getPackets(docId) {
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
    getCategorized(docId){
        let extracted = getPackets(docId);
        let categoryStore = JSON.parse(fs.readFileSync(`${getDocDir(docId)}/categories.json`));
        for (let i = 0; i < categoryStore.length; i++){
            this.applyTopic(extracted, categoryStore[i]);
        }
        return extracted;
    }
    applyTopic(packets, topicObj){
        for (let i = 0; i < topicObj.questions.length; i++){
            let address = topicObj.questions[i];
            this.applyToAddress(packets, address, topicObj.topic);
        }
    }
    applyToAddress(packets, address, topic){
        for (let i = 0; i < packets.length; i++){
            if (packets[i].id == address.packetId){
                let questions = packets[i].questions;
                for (let j = 0; j < questions.length; j++){
                    if (questions[i].id == address.questionId){
                        questions[i].categorize(topic);
                    }
                }
            }
        }
    }
}