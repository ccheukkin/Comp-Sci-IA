export default class ExtractInterface{
    constructor(extractSub, storeSub){
        this.extractSub = extractSub;
        this.storeSub = storeSub;
    }
    getDocId(){
        return this.storeSub.getDocId();
    }
    getDocDir(docId){
        return this.storeSub.getDocDir(docId);
    }
    async extract(docDir, docId, options){
        let resultPackets = await this.extractSub.extractFrom(docDir, options);
        this.storeSub.store(resultPackets, docId);
    }
    async getReview(docId){
        return await this.storeSub.get(docId);
        // return await new Promise((res, rej)=>{setTimeout(()=>{
        //     res({packet: [1,2,3]})});
        // }, 2000);
    }
    add(packetId, questionId, content){
        this.storeSub.add(packetId, questionId, content);
    }
    delete(packetId, questionId, contentId){
        this.storeSub.delete(packetId, questionId, contentId);
    }
    modify(addresses, options){
        let packets = this.storeSub.get(addresses);
        let modifiedPackets = this.extractSub.modify(packets, options)
        this.storeSub.store(modifiedPackets);
    }
}