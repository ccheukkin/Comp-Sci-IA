import { Content, Question, Packet } from "../../wrappers"

interface StoreClass {
    getUrl(docId: number): string;
    storePackExt(packs: Packet[]): boolean;
    mutateCon(con: Content): boolean;
    storePackCat(packs: Packet[]): boolean;
    mutateCat(que: Question): boolean;
    getPacks(docId: number): Packet[];
    getPack(packId: number): Packet;
    query(opts: object): Question[];
}

export default StoreClass;