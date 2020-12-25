/*
metaData:
- type [text, table(2d array), url...]
- answer [true, false]
- index [0,1,2,3]
- textContent 
*/
export default class Content{
    constructor(info){
        this.id = info.id;
        this.type = info.type;
        this.answer = info.answer;
        this.object = info.object;
    }
}