import { Doc, Content, Packet, Question } from "../data-schema.js"

abstract class ExtractAbstract {
    abstract extract(docId: number, docUrl: string, opts: object): Packet[];
}

abstract class CategorizeAbstract {
    abstract categorize(packs: Packet[]): Packet[];
}

abstract class StoreAbstract {
    abstract getDoc(id: number): Doc;
    abstract setDoc(): boolean;
}

export { ExtractAbstract, CategorizeAbstract, StoreAbstract };