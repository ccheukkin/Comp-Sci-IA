export default class CategorizeInterface{
    constructor(categorizeClass, storeClass){
        this.categorizeClass = categorizeClass;
        this.storeClass = storeClass;
    }
    async categorize(docId){
        let packets = await this.getReview(docId);
        packets = await this.categorizeClass.categorize(packets);
        this.storeClass.storePacketsCategories(packets, docId);
    }
    async getReview(docId){
        return await this.storeClass.getCategorized(docId);
    }
}