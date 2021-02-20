import { Doc, Content, Packet, Question, Category } from "./data-schema.js"

abstract class ExtractAbstract {
    abstract extract(docId: number, docUrl: string, opts: object): Packet[];
}

abstract class CategorizeAbstract {
    abstract categorize(packs: Packet[]): Packet[];
}

abstract class StoreAbstract {
    abstract readDoc(id: number): Promise<Doc>;
    abstract readPacket(id: number): Promise<Packet>;
    abstract readQuestion(id: number): Promise<Question>;
    abstract readContent(id: number): Promise<Content>;
    abstract readAllCategories(): Promise<Category[]>;
    abstract createDoc(newDoc: Doc): Promise<number|null>;
    abstract createPacket(docId: number, newPacket: Packet): Promise<number|null>;
    abstract createQuestion(packetId: number, newQuestion: Question): Promise<number|null>;
    abstract createContent(questionId: number, newContent: Content): Promise<number|null>;
    abstract createCategory(name: String): Promise<number|null>;
    abstract updateDesc(docId: number, newDesc: String): Promise<boolean>;
    abstract updateContent(contentId: number, newContent: Content): Promise<boolean>;
    abstract categorizeQuestion(questionId: number, categories: number[]): Promise<boolean>;
    abstract renameCategory(categoryId: number, newName: String): Promise<boolean>;
    abstract deleteDoc(id: number, recursive: boolean): Promise<boolean>;
    abstract deletePacket(id: number, recursive: boolean): Promise<boolean>;
    abstract deleteQuestion(id: number, recursive: boolean): Promise<boolean>;
    abstract deleteContent(id: number): Promise<boolean>;
    abstract deleteCategory(id: number): Promise<boolean>;
}

export { ExtractAbstract, CategorizeAbstract, StoreAbstract };