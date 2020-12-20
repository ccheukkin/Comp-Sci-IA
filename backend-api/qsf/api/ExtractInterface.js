export default class ExtractInterface{
    constructor(extractSub, storeSub){
        this.extractSub = extractSub;
        this.storeSub = storeSub;
    }
    extract(docx, options){
        let resultPackets = this.extractSub.extractFrom(docx, options);
        let packetIds = this.storeSub.store(resultPackets);
        return packetIds;
    }
    getReview(packetIds){
        this.storeSub.get(packetIds);
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