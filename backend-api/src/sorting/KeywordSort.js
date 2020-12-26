import Packet from "../wrapper/Packet";
import Question from "../wrapper/Question";

export default class KeywordSort{
    patterns(){ return [
        {topic: "Computer System", keywords: "(beta)|(alpha)|(testing)"},
    ];}
    sort(packets){
        let returnPackets = [];
        for (let i = 0; i < packets.length; i++){
            returnPackets.push(this.sortPacket(packets[i]));
        }
        return returnPackets;
    }
    sortPacket(packet){
        let returnQuestions = [];
        for (let i = 0; i < packet.questions.length; i++){
            returnQuestions.push(this.sortQuestion(packet.questions[i]));
        }
        return new Packet(packet.id, returnQuestions);
    }
    sortQuestion(question){
        let categories = [];
        let patterns = patterns();
        for (let i = 0; i < patterns.length; i++){
            let search1 = question.contents[0].search(new RegExp(patterns[i].keywords);
            let search2 = question.contents[1].search(new RegExp(patterns[i].keywords);
            if (search1 >= 0 || search2 >=0){
                categories.push(patterns.topic);
            };
        }
        return new Question(question.id, question.contents, categories);
    }
}