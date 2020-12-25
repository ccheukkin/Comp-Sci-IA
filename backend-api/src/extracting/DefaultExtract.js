import mammoth from "mammoth"
import Packet from "../wrapper/Packet.js"
import Question from "../wrapper/Question.js"
import Content from "../wrapper/Content.js"

export default class DefaultExtract{
    /*
        ==OPTIONS SCHEMA==
            answer: boolean
    */
    async extractFrom(docDir, options){
        let packets = [];
        let html = (await mammoth.extractRawText({path: docDir})).value;
        let sectionA = options.answer ? /section\s*a\s*total/i : /section\s*a\s*answer/i;
        let sectionB = options.answer ? /section\s*b\s*total/i : /section\s*b\s*answer/i;
        let startInd = html.search(sectionA);
        let endInd = html.search(sectionB);
        let pattern = /(\d+)\.\s*([A-Z]([^](?!\d+\.))+)/g;
        let matches = [...html.substring(startInd,endInd).matchAll(pattern)];
        for (let i = 0; i < matches.length; i++){
            let question = matches[i][2];
            let packetId = matches[i][1];
            let newContent = new Content({id: 0, type: "text", answer: options.answer, object: question});
            let newQuestion = new Question(0);
            newQuestion.push(newContent);
            let newPacket = new Packet(packetId);
            newPacket.push(newQuestion);
            packets.push(newPacket);
        }
        return packets;
    }
    modify(packets, options){

    }
}