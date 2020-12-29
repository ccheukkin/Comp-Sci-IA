import fs from "fs";
import Content from "../wrapper/Content.js";
import Question from "../wrapper/Question.js";
import Packet from "../wrapper/Packet.js";
import Address from "../wrapper/Address.js";

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
    rootDir() {return "./local-storage";}
    getDocDir(docId) {
        let docDir = `${this.rootDir()}/${docId}`;
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
            let dir = `${docDir}/${packet.address.packetId}`;
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }
            this.storeQuestionExtractions(packet.questions, dir);
        }
    }
    // store extracted questions
    storeQuestionExtractions(questions, root){
        for (let i = 0; i < questions.length; i++){
            let question = questions[i];
            let dir = `${root}/${question.address.packetId}`;
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }
            let contentInfo = this.storeContentExtractions(question.contents, dir);
            let infoFile = `${dir}/info.json`;
            if (fs.existsSync(infoFile)){
                let oldContentList = JSON.parse(fs.readFileSync(infoFile));
                contentInfo = this.mergeInfoMulti(oldContentList, contentInfo, dir);
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
        let qna = content.address.answer? "a" : "q";
        let dir = `${root}/${qna}`;
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        switch(content.type){
            case "text":
            case "code":
                break;
            case "image":
                fs.writeFileSync(`${dir}/${content.address.contentId}.jpg`, content.object, "base64");
                content.type = "url";
                content.object = `${dir}/${content.address.contentId}.jpg`;
                break;
            case "table":
                fs.writeFileSync(`${dir}/${content.address.contentId}.json`, JSON.stringify(content.object));
                content.type = "url";
                content.object = `${dir}/${content.address.contentId}.json`;
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
        this.deleteInfo(infoRemoved, content.address.contentId, content.address.answer, root);
        infoRemoved.push(content);
        return infoRemoved;
    }
    deleteInfo(info, contentId, answer, root){
        for (let i = 0; i < info.length; i++){
            let curContent = info[i];
            if (curContent.address.contentId == contentId && curContent.answer == answer){
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
        let infoFile = `${dir}/info.json`;
        if (fs.existsSync(infoFile)){
            let contentInfo = JSON.parse(fs.readFileSync(infoFile));
            promiseContent = this.mergeInfoMulti(contentInfo, promiseContent)
        }
        fs.writeFileSync(infoFile, JSON.stringify(promiseContent));
    }

    // CATEGORIZE
    // append categories of a list of packets
    storePacketsCategories(packets){
        for (let i = 0; i < packets.length; i++){
            let packet = packets[i];
            this.storeQuestionsCategories(packet.questions);
        }
    }
    // append categories of a list of questions
    storeQuestionsCategories(questions){
        for (let i = 0; i < questions.length; i++){
            let question = questions[i];
            this.setCategories(question.categories, question.address.docId, question.address.packetId, question.address.questionId);
        }
    }
    // set the categorization of a question
    setCategories(categories, docId, packetId, questionId){
        let dir = `${this.rootDir()}/${docId}/${packetId}/${questionId}`;
        fs.writeFileSync(`${dir}/categories.json`, JSON.stringify(categories));
    }
    // get the categorization of a question
    getCategories(root){
        let file = `${root}/categories.json`;
        if (!fs.existsSync(file)){
            return [];
        }
        return JSON.parse(fs.readFileSync(file));
    }
    // RETRIEVING
    getPackets(docId) {
        let packets = [];
        let dir = this.getDocDir(docId);
        fs.readdirSync(dir).forEach(file => {
            let id = parseInt(file);
            if (id == 0 || id){
                let dir = `${this.rootDir()}/${docId}/${id}`;
                let address = new Address(docId, id);
                let questions = this.getQuestions(dir, address);
                packets.push(new Packet(address, questions));
            }
        });
        return packets;
    }
    getQuestions(root, packetAddress){
        let questions = [];
        fs.readdirSync(root).forEach(file => {
            let id = parseInt(file);
            if (id == 0 || id){
                let dir = `${root}/${file}`;
                let address = new Address(packetAddress.docId, packetAddress.packetId, file)
                let contents = this.getContents(dir);
                let categories = this.getCategories(dir);
                questions.push(new Question(address, contents, categories));
            }
        });
        return questions;
    }
    getContents(root){
        let contents = [];
        let questionInfo = JSON.parse(fs.readFileSync(`${root}/info.json`));
        for (let i = 0; i < questionInfo.length; i++){
            let contentInfo = questionInfo[i];
            contents.push(new Content(contentInfo.address, contentInfo.type, contentInfo.object));
        }
        return contents;
    }

    //QUERYING
    query(options){
        let returnQuestions = [];
        fs.readdirSync(this.rootDir()).forEach(file=>{
            let docId = parseInt(file);
            if (docId){
                let packets = this.getPackets(docId);
                let addQuestions = this.searchPackets(packets, options.categories, options.andMode);
                returnQuestions = returnQuestions.concat(addQuestions);
            }
        });
        return returnQuestions;
    }
    searchPackets(packets, categories, andMode){
        let returnQuestions = [];
        for (let i = 0; i < packets.length; i++){
            let addQuestions = this.searchQuestions(packets[i].questions, categories, andMode);
            returnQuestions = returnQuestions.concat(addQuestions);
        }
        return returnQuestions;
    }
    searchQuestions(questions, categories, andMode){
        let returnQuestions = [];
        for (let i = 0; i < questions.length; i++){
            if (this.matchQuestion(questions[i], categories, andMode)){
                returnQuestions.push(questions[i]);
            }
        }
        return returnQuestions;
    }
    matchQuestion(question, categories, andMode){
        let match = 0;
        for (let i = 0; i < categories.length; i++){
            if (this.haveCategory(question, category)){
                match++;
            }
        }
        return andMode ? match == categories.length : match > 0;
    }
}