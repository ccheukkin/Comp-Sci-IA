export default class Packet{
    constructor(address, questions){
        this.address = address;
        this.questions = questions;
    }
    push(question){
        this.questions.push(question);
    }
}