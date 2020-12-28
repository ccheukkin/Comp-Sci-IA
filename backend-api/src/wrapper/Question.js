export default class Question{
    constructor(address, contents, categories){
        this.address = address;
        this.contents = contents;
        this.categories = categories;
    }
    push(content){
        this.contents.push(content);
    }
}