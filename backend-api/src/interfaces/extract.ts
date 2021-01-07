import ExtractClass from "../classes/extract/extract.schema";
import StoreClass from "../classes/store/store.schema";

class ExtractInterface{
    extractClass: ExtractClass;
    storeClass: StoreClass;

    constructor(extractClass: ExtractClass, storeClass: StoreClass){
        this.extractClass = extractClass;
        this.storeClass = storeClass
    }
}

export default ExtractInterface;