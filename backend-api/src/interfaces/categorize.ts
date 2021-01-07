import CategorizeClass from "../classes/categorize/categorize.schema";
import StoreClass from "../classes/store/store.schema";

class CategorizeInterface{
    categorizeClass: CategorizeClass;
    storeClass: StoreClass;

    constructor(categorizeClass: CategorizeClass, storeClass: StoreClass){
        this.categorizeClass = categorizeClass;
        this.storeClass = storeClass
    }
}

export default CategorizeInterface;