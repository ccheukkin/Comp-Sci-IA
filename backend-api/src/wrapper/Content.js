/*
metaData:
- type [text, table(2d array), url...]
- answer [true, false]
- index [0,1,2,3]
- object 
*/
export default class Content{
    constructor(address, type, object){
        this.address = address;
        this.type = type;
        this.object = object;
    }
}