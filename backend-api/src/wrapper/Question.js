export default class Question{
    constructor(id){
        this.id = id;
        this.contents = [];
    }
    push(content){
        this.contents.push(content);
    }
    
}