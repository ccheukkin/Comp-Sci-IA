export default class QueryingInterface{
    constructor(storeClass){
        this.storeClass = storeClass;
    }
    async getReview(docId){
        return await this.storeClass.getPackets(docId);
    }
    async query(options){
        let andMode;
        switch(options.mode){
            case "AND":
                andMode = true;
                break;
            case "OR":
                andMode = false;
                break;
            default:
                console.log("Invalid Mode");
                return;
        }
        if (options.categories.length == 0){
            console.log("No Category Given");
            return;
        }
        let questions = await this.storeClass.query(options.categories, andMode);
        return {questions};
    }
}