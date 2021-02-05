import { StoreAbstract } from "../classes-schema.js"
import { PrismaClient } from '@prisma/client'
import { Doc } from "../../data-schema.js"

class MySqlStore extends StoreAbstract {
    getDoc(id): Doc {

    }

    setDoc(): boolean {

    }
};

export default MySqlStore;