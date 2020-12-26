export default class ExtractInterface{
    constructor(extractClass, storeClass){
        this.extractClass = extractClass;
        this.storeClass = storeClass;
    }
    getDocId(){
        return this.storeClass.getDocId();
    }
    getDocDir(docId){
        return this.storeClass.getDocDir(docId);
    }
    async extract(docDir, docId, options){
        let resultPackets = await this.extractClass.extractFrom(docDir, options);
        this.storeClass.store(resultPackets, docId);
    }
    async getReview(docId){
        return await this.storeClass.get(docId);
    }
    async add(packetId, questionId, content){
        this.storeClass.add(packetId, questionId, content);
    }
    async delete(packetId, questionId, contentId){
        this.storeClass.delete(packetId, questionId, contentId);
    }
    async modify(addresses, options){
        let packets = this.storeClass.get(addresses);
        let modifiedPackets = this.extractClass.modify(packets, options)
        this.storeClass.store(modifiedPackets);
    }
}