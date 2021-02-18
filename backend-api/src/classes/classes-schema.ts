import { Doc, Content, Packet, Question } from "../data-schema.js"

abstract class ExtractAbstract {
    abstract extract(docId: number, docUrl: string, opts: object): Packet[];
}

abstract class CategorizeAbstract {
    abstract categorize(packs: Packet[]): Packet[];
}

abstract class StoreAbstract {
    abstract getDoc(id: number): Promise<Doc>;
    abstract getPacket(id: number): Promise<Packet>;
    abstract getQuestion(id: number): Promise<Question>;
    abstract getContent(id: number): Promise<Content>;
    abstract setDoc(id: number, allowNew: boolean): Promise<boolean>;
    // abstract setPacket(id: number, allowNew: boolean): Promise<boolean>;
    // abstract setQuestion(id: number, allowNew: boolean): Promise<boolean>;
    // abstract setContent(id: number, allowNew: boolean): Promise<boolean>;
    // abstract setCategory(questionId: number): Promise<boolean>;
}

export { ExtractAbstract, CategorizeAbstract, StoreAbstract };