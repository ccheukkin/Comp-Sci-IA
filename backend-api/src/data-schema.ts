interface Doc {
    id?: number;
    desc: String;
    packets: Packet[];
}
  
interface Packet {
    id?: number;
    order: number;
    questions: Question[];
}
  
interface Question {
    id?: number;
    order: number;
    contents: Content[];
    categories: Category[];
}
  
interface Content {
    id?: number;
    order: number;
    contentType: ContentType;
    dataType: DataType;
    obj: String;
}
  
interface Category {
    id?: number;
    name: String;
}
  
enum ContentType {
    Question,
    Answer,
    Packet
}
  
enum DataType {
    Text,
    ImageUrl,
    Table
}

export { Doc, Packet, Question, Content, Category, ContentType, DataType }