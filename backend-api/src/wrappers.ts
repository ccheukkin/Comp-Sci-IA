export interface Address {
    docId: number;
    pacId?: number;
    queId?: number;
    conId?: number;
    ans?: boolean;
}

export interface RawContent{
    addr: Address;
    type: string;
    obj: any;
}

export interface Content{
    addr: Address;
    type: string;
    obj: string;
}

export interface Question{
    addr: Address;
    cons: Content[];
    cats: string[];
}

export interface Packet{
    addr: Address;
    ques: Question[];
}

// export {Address, RawContent, Content, Question, Packet};