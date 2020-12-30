export default class CategorizeInterface{
    constructor(categorizeClass, storeClass){
        this.categorizeClass = categorizeClass;
        this.storeClass = storeClass;
    }
    async categorize(docId){
        let packets = await this.getReview(docId);
        packets = await this.categorizeClass.categorize(packets);
        this.storeClass.storePacketsCategories(packets);
    }
    async setCategories(body){
        let success = await setCategories(body.categories, body.docId, body.packetId, body.questionId);
        return success ? "Succeed" : "Failed";
    }
}