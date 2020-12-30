import mammoth from "mammoth"
import Packet from "../wrapper/Packet.js"
import Question from "../wrapper/Question.js"
import Content from "../wrapper/Content.js"
import Address from "../wrapper/Address.js";

class SimpleExtract{
    /*
        ==OPTIONS SCHEMA==
        answer: boolean
    */
    async extract(docId, docDir, options){
        let packets = [];
        let html = (await mammoth.extractRawText({path: docDir})).value;
        let sectionA = options.answer ? /section\s*a\s*total/i : /section\s*a\s*answer/i;
        let sectionB = options.answer ? /section\s*b\s*total/i : /section\s*b\s*answer/i;
        let startInd = html.search(sectionA);
        let endInd = html.search(sectionB);
        let pattern = /(\d+)\.\s*([A-Z]([^](?!\d+\.))+)/g;
        let matches = [...html.substring(startInd,endInd).matchAll(pattern)];
        let curPacket = 0;
        for (let i = 0; i < matches.length; i++){
            let question = matches[i][2];
            let packetId = parseInt(matches[i][1]);
            if (curPacket >= packetId){
                continue;
            }
            curPacket = packetId;
            let questionId = 0;
            let contentId = 0;
            let newContent = new Content(new Address(docId, packetId, questionId, contentId, options.answer), "text", question);
            let newQuestion = new Question(new Address(docId, packetId, questionId), []);
            newQuestion.push(newContent);
            let newPacket = new Packet(new Address(docId, packetId), []);
            newPacket.push(newQuestion);
            packets.push(newPacket);
        }
        return packets;
    }
}
export default SimpleExtract;