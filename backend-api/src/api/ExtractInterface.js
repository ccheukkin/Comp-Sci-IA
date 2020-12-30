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
    async extract(docId, docDir, options){
        let resultPackets = await this.extractClass.extract(docId, docDir, options);
        this.storeClass.storePacketExtractions(resultPackets, docId);
    }
    async setContent(query, text, file){
        let realObject = file ? file.object : text ? JSON.parse(text) : null;
        await this.storeClass.setContent(query.docId, query.packetId, query.questionId, query.contentId, query.type, query.answer, query.createParent, query.replace, realObject);
    }
}