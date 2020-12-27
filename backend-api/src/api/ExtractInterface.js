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
        let resultPackets = await this.extractClass.extract(docDir, options);
        this.storeClass.storePacketExtractions(resultPackets, docId);
    }
    async getReview(docId){
        return await this.storeClass.getPackets(docId);
    }
    async setContent(query, object, file){
        let realObject = query.type == "image" ? file : object;
        let succeed = await this.storeClass.setContent(query.docId, query.packetId, query.questionId, query.contentId, query.type, query.answer, query.createParent, query.replace, realObject);
        return succeed ? "Succeed" : "Failed";
    }
}