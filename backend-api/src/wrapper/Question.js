export default class Question{
    constructor(id, contents){
        this.id = id;
        this.contents = contents;
    }
    push(content){
        this.contents.push(content);
    }

}