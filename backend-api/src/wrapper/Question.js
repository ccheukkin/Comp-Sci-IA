export default class Question{
    constructor(id, contents, categories){
        this.id = id;
        this.contents = contents;
        this.categories = categories;
    }
    push(content){
        this.contents.push(content);
    }
}