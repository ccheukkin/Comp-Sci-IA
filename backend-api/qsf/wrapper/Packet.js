export default class Packet{
    constructor(id){
        this.id = id;
        this.questions = [];
    }
    push(question){
        this.questions.push(question);
    }
}