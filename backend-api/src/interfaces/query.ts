import StoreClass from "../classes/store/store.schema";

class QueryInterface{
    storeClass: StoreClass;

    constructor(storeClass: StoreClass){
        this.storeClass = storeClass
    }
}

export default QueryInterface;