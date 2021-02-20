// \/ USE CUSTOM CLASSES HERE \/
import ExtractClass from "./classes/extract/SimpleExtract.js"
import CategorizeClass from "./classes/categorize/KeywordCategorize.js"
import StoreClass from "./classes/store/PrismaStore/main.js"
// /\ USE CUSTOM CLASSES HERE /\

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import apollo from 'apollo-server'
const { ApolloServer } = apollo;

// const extract: ExtractClass = SimpleExtract;
// const categorize: CategorizeClass = KeywordCategorize;
const store: StoreClass = new StoreClass();

const server = new ApolloServer({
    typeDefs:  fs.readFileSync(path.join(__dirname, 'graphql/schema.graphql'), 'utf8'),
    resolvers: {
        Query: {
            readDoc: async (_, args)=>{
                return await store.readDoc(args.id);
            },
            readPacket: async (_, args)=>{
                return await store.readPacket(args.id);
            },
            readQuestion: async (_, args)=>{
                return await store.readQuestion(args.id);
            },
            readContent: async (_, args)=>{
                return await store.readContent(args.id);
            },
            readAllCategories: async ()=>{
                return await store.readAllCategories();
            }
        },
        Mutation: {
            createDoc: async (_, args)=>{
                let doc = JSON.parse(args.doc);
                return await store.createDoc(doc);
            },
            createPacket: async (_, args)=>{
                let packet = JSON.parse(args.packet);
                return await store.createPacket(args.docId, packet);
            },
            createQuestion: async (_, args)=>{
                let question = JSON.parse(args.question);
                return await store.createQuestion(args.packetId, question);
            },
            createContent: async (_, args)=>{
                let content = JSON.parse(args.content);
                return await store.createContent(args.questionId, content);
            },
            createCategory: async (_, args)=>{
                return await store.createCategory(args.name);
            },
            categorizeQuestion: async (_, args)=>{
                return await store.categorizeQuestion(args.questionId, args.categories);
            },
            updateDesc: async (_, args)=>{
                return await store.updateDesc(args.docId, args.newDesc);
            },
            updateContent: async (_, args)=>{
                let content = JSON.parse(args.newContent);
                return await store.updateContent(args.contentId, content);
            },
            renameCategory: async (_, args)=>{
                return await store.renameCategory(args.categoryId, args.newName);
            },
            deleteDoc: async (_, args)=>{
                return await store.deleteDoc(args.id, args.recursive);
            },
            deletePacket: async (_, args)=>{
                return await store.deletePacket(args.id, args.recursive);
            },
            deleteQuestion: async (_, args)=>{
                return await store.deleteQuestion(args.id, args.recursive);
            },
            deleteContent: async (_, args)=>{
                return await store.deleteContent(args.id);
            },
            deleteCategory: async (_, args)=>{
                return await store.deleteCategory(args.id);
            }
        }
    }
  });

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
);