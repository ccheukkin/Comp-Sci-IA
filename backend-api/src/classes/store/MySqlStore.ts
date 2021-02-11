import { StoreAbstract } from "../classes-schema.js"
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { Doc, Content, Question, Packet } from "../../data-schema.js"

class MySqlStore extends StoreAbstract {
    prisma;

    constructor() {
        super();
        this.prisma = new PrismaClient();
    }

    async getDoc(id: number): Promise<Doc> {
        return await this.prisma.doc.findUnique({
            where: {
                id: id
            },
            include: {
                packets: {
                    include: {
                        questions: {
                            include: {
                                categories: true,
                                contents: true
                            }
                        }
                    }
                }
            }
        }) as Doc;
    }

    async setDoc(): Promise<boolean> {
        let newContent = {
            order: 0,
            contentType: "Question",
            dataType: "Text",
            obj: "Sample Question. This is a sample question for testing",
        }

        let newQuestion = {
            order: 0,
            contents: {create: [newContent]},
            categories: []
        }

        let newPacket = {
            order: 0,
            questions: {create: [newQuestion]}
        }

        let newDoc = {
            desc: "Sample Document",
            packets: {create: [newPacket]}
        }

        await this.prisma.doc.create({
            data: newDoc
        });

        return true;
    }
};

export default MySqlStore;