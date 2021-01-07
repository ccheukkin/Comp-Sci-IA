import { Packet } from "../../wrappers"

interface CategorizeClass {
    categorize(packs: Packet[]): Packet[];
}

export default CategorizeClass;