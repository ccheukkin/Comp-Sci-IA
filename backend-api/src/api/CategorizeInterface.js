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
    async setCategories(query, categories){
        if (!categories) {return "Failed";}
        let success = await setCategories(JSON.parse(categories), query.docId, query.packetId, query.questionId);
        return success ? "Succeed" : "Failed";
    }
}