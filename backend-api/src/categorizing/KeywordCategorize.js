import Packet from "../wrapper/Packet.js";
import Question from "../wrapper/Question.js";

class KeywordCategorize{
    patterns(){ return [
        {topic: "Computer System", keywords: "(beta)|(alpha)|(testing)|(organi[sz]ation)"},
    ];}
    categorize(packets){
        let returnPackets = [];
        for (let i = 0; i < packets.length; i++){
            returnPackets.push(this.categorizePacket(packets[i]));
        }
        return returnPackets;
    }
    categorizePacket(packet){
        let returnQuestions = [];
        for (let i = 0; i < packet.questions.length; i++){
            returnQuestions.push(this.categorizeQuestion(packet.questions[i]));
        }
        return new Packet(packet.id, returnQuestions);
    }
    categorizeQuestion(question){
        let categories = [];
        let patterns = patterns();
        for (let i = 0; i < patterns.length; i++){
            let contentList = question.contents;
            for (let j = 0; j < contentList.length; j++){
                if (contentList[j].type == "text" && contentList[j].object.search(new RegExp(patterns[i].keywords, "i"))>=0){
                    categories.push(patterns.topic);
                    break;
                }
            }
        }
        return new Question(question.id, question.contents, categories);
    }
}
export default KeywordCategorize;