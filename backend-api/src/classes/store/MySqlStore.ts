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
    
    //#region Getters
    //#region Selectors
    contentSelect = {
        id: true,
        order: true,
        contentType: true,
        dataType: true,
        obj: true
    }

    questionSelect = {
        id: true,
        order: true,
        categories: true,
        contents: {
            select: this.contentSelect
        }
    }

    packetSelect = {
        id: true,
        order: true,
        questions: {
            select: this.questionSelect
        }
    }

    docSelect = {
        id: true,
        desc: true,
        packets: {
            select: this.packetSelect
        }
    }
    //#endregion
    //#region Get from Database
    async getDoc(id: number): Promise<Doc> {
        return await this.prisma.doc.findUnique({
            where: {
                id: id
            },
            select: this.docSelect
        }) as Doc;
    }

    async getPacket(id: number): Promise<Packet> {
        return await this.prisma.packet.findUnique({
            where: {
                id: id
            },
            select: this.packetSelect
        }) as Packet;
    }

    async getQuestion(id: number): Promise<Question> {
        return await this.prisma.question.findUnique({
            where: {
                id: id
            },
            select: this.questionSelect
        }) as Question;
    }

    async getContent(id: number): Promise<Content> {
        return await this.prisma.content.findUnique({
            where: {
                id: id
            },
            select: this.contentSelect
        }) as Content;
    }
    //#endregion
    //#endregion
    
    //#region Setters
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
    //#endregion
};

export default MySqlStore;