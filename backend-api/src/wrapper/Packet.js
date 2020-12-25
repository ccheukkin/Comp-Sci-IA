export default class Packet{
    constructor(id, questions){
        this.id = id;
        this.questions = questions;
    }
    push(question){
        this.questions.push(question);
    }
}