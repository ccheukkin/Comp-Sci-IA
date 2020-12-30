import Question from "../wrapper/Question.js";
import Address from "../wrapper/Address.js";

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
        let fakeQuestion = new Question(new Address(query.docId, query.packetId, query.questionId), null, JSON.parse(categories));
        let success = await setCategories(fakeQuestion);
        return success ? "Succeed" : "Failed";
    }
}