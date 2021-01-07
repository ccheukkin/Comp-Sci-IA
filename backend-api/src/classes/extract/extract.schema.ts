import { Packet } from "../../wrappers"

interface ExtractClass {
    extract(docId: number, docUrl: string, opts: object): Packet[];
}

export default ExtractClass;