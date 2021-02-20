import { StoreAbstract } from "../../../classes-schema.js"
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { Doc, Content, Question, Packet, Category } from "../../../data-schema.js"

class PrismaStore extends StoreAbstract {
    prisma;

    constructor() {
        super();
        this.prisma = new PrismaClient();
    }
    
    //#region Read
    //#region Selectors
    categorySelect = {
        id: true,
        name: true
    }

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
        categories: {
            select: this.categorySelect
        },
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
    //#region Read from Database
    async readDoc(id: number): Promise<Doc|null> {
        return await this.prisma.doc.findUnique({
            where: {
                id: id
            },
            select: this.docSelect
        });
    }

    async readPacket(id: number): Promise<Packet|null> {
        return await this.prisma.packet.findUnique({
            where: {
                id: id
            },
            select: this.packetSelect
        });
    }

    async readQuestion(id: number): Promise<Question|null> {
        return await this.prisma.question.findUnique({
            where: {
                id: id
            },
            select: this.questionSelect
        });
    }

    async readContent(id: number): Promise<Content|null> {
        return await this.prisma.content.findUnique({
            where: {
                id: id
            },
            select: this.contentSelect
        });
    }
    async readAllCategories(): Promise<Category[]> {
        return await this.prisma.category.findMany({
            select: this.categorySelect
        });
    }
    //#endregion
    //#endregion

    //#region Create
    //#region Transform to create syntax
    transformDoc(startingDoc: Doc) {
        let { packets, id, ...rest } = startingDoc;
        return {
            ...rest,
            packets: {
                create: packets.map((packet)=>this.transformPacket(packet))
            }
        }
    }

    transformPacket(startingPacket: Packet) {
        let { questions, id, ...rest } = startingPacket;
        return {
            ...rest,
            questions: {
                create: questions.map((question)=>this.transformQuestion(question))
            }
        }
    }

    transformQuestion(startingQuestion: Question) {
        let { contents, categories, id, ...rest } = startingQuestion;
        return {
            ...rest,
            contents: {
                create: contents.map((content)=>this.transformContent(content))
            }
        }
    }

    transformContent(startingContent: Content) {
        let { id, ...rest } = startingContent;
        return rest;
    }
    //#endregion
    //#region Create to Database
    async createDoc(newDoc: Doc): Promise<number|null> {
        let createdDoc = await this.prisma.doc.create({
            data: this.transformDoc(newDoc)
        });
        return createdDoc?.id;
    }
    
    async createPacket(docId: number, newPacket: Packet): Promise<number|null> {
        let createdPacket = await this.prisma.packet.create({
            data: {
                ...(this.transformPacket(newPacket)),
                document: {
                    connect: {
                        id: docId
                    }
                }
            }
        });
        return createdPacket?.id;
    }

    async createQuestion(packetId: number, newQuestion: Question): Promise<number|null> {
        let createdQuestion = await this.prisma.question.create({
            data: {
                ...(this.transformQuestion(newQuestion)),
                packet: {
                    connect: {
                        id: packetId
                    }
                }
            }
        });
        return createdQuestion?.id;
    }

    async createContent(questionId: number, newContent: Content): Promise<number|null> {
        let createdContent = await this.prisma.content.create({
            data: {
                ...(this.transformContent(newContent)),
                question: {
                    connect: {
                        id: questionId
                    }
                }
            }
        });
        return createdContent?.id;
    }

    async createCategory(name: String): Promise<number|null> {
        let createdCategory = await this.prisma.category.create({
            data: {
                name
            }
        });
        return createdCategory?.id;
    }
    //#endregion
    //#endregion

    //#region Update
    async updateDesc(docId: number, newDesc: String): Promise<boolean|null> {
        let updatedDoc = await this.prisma.doc.update({
            where: {
                id: docId
            },
            data: {
                desc: newDesc
            }
        });
        return updatedDoc ? true : false;
    }

    async updateContent(contentId: number, newContent: Content): Promise<boolean> {
        let updatedContent = await this.prisma.content.update({
            where: {
                id: contentId
            },
            data: newContent
        });
        return updatedContent ? true : false;
    }

    async categorizeQuestion(questionId: number, categories: number[]): Promise<boolean> {
        let updatedQuestion = await this.prisma.question.update({
            where: {
                id: questionId
            },
            data: {
                categories: {
                    connect: categories.map((id)=>{ return {id} })
                }
            }
        });
        return updatedQuestion ? true : false;
    }

    async renameCategory(categoryId: number, newName: String): Promise<boolean> {
        let updatedCategory = await this.prisma.category.update({
            where: {
                id: categoryId
            },
            data: {
                name: newName
            }
        });
        return updatedCategory ? true : false;
    }
    //#endregion

    //#region Delete
    async deleteDoc(id: number, recursive: boolean): Promise<boolean> {
        if (recursive) {
            await this.prisma.content.deleteMany({
                where: {
                    question:{
                        packet: {
                            document: { id }
                        }
                    }
                }
            });
            await this.prisma.question.deleteMany({
                where: {
                    packet: {
                        document: { id }
                    }
                }
            });
            await this.prisma.packet.deleteMany({
                where: {
                    document: { id }
                }
            });
        }
        let deletedDoc = await this.prisma.doc.delete({
            where: { id }
        });
        return deletedDoc ? true : false;
    }

    async deletePacket(id: number, recursive: boolean): Promise<boolean> {
        if (recursive) {
            await this.prisma.content.deleteMany({
                where: { 
                    question: {
                        packet: { id }
                    }    
                }
            });
            await this.prisma.question.deleteMany({
                where: { 
                    packet: { id }
                }
            });
        }
        let deletedPacket = await this.prisma.packet.delete({
            where: { id }
        });
        return deletedPacket ? true : false;
    }

    async deleteQuestion(id: number, recursive: boolean): Promise<boolean> {
        if (recursive) {
            await this.prisma.content.deleteMany({
                where: { 
                    question: { id }    
                }
            });
        }
        let deletedQuestion = await this.prisma.question.delete({
            where: { id }
        });
        return deletedQuestion ? true : false;
    }

    async deleteContent(id: number): Promise<boolean> {
        let deletedContent = await this.prisma.content.delete({
            where: { id }
        });
        return deletedContent ? true : false;
    }

    async deleteCategory(id: number): Promise<boolean> {
        let deletedCategory = await this.prisma.category.delete({
            where: { id }
        });
        return deletedCategory ? true : false;
    }
    //#endregion
};

export default PrismaStore;