export default class Question{
    constructor(id, contents){
        this.id = id;
        this.contents = contents;
        this.category = [];
    }
    push(content){
        this.contents.push(content);
    }
    
}