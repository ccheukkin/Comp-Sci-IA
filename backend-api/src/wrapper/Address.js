export default class Address{
    constructor(docId, packetId, questionId=null, contentId=null, answer=null){
        this.docId = docId;
        this.packetId = packetId;
        this.questionId = questionId;
        this.contentId = contentId;
        this.answer = answer;
    }
}