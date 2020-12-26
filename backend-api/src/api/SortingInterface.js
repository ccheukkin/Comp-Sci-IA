export default class SortingInterface{
    constructor(sortClass, storeClass){
        this.sortClass = sortClass;
        this.storeClass = storeClass;
    }
    async sort(docId){
        let packets = await this.getReview(docId);
        packets = await this.sortClass.sort(packets);
        this.storeClass.store(packets, docId);
    }
    async getReview(docId){
        return await this.storeClass.get(docId);
    }
}