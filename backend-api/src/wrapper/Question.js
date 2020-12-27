export default class Question{
    constructor(id, contents){
        this.id = id;
        this.contents = contents;
        this.categories = [];
    }
    push(content){
        this.contents.push(content);
    }
    categorize(category){
        this.categories.push(category);
    }
}