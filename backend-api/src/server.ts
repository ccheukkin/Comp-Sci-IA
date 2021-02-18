// \/ USE CUSTOM CLASSES HERE \/
import ExtractClass from "./classes/extract/SimpleExtract.js"
import CategorizeClass from "./classes/categorize/KeywordCategorize.js"
import StoreClass from "./classes/store/MySqlStore.js"
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
    typeDefs:  fs.readFileSync(path.join(__dirname, '../graphql/schema.graphql'), 'utf8'),
    resolvers: {
        Query: {
            getDoc: async (_, args)=>{
                return await store.getDoc(args.id);
            },
            getPacket: async (_, args)=>{
                return await store.getPacket(args.id);
            },
            getQuestion: async (_, args)=>{
                return await store.getQuestion(args.id);
            },
            getContent: async (_, args)=>{
                return await store.getContent(args.id);
            }
        },
        Mutation: {
            setDoc: async ()=>{
                return await store.setDoc();
            }
        }
    }
  });

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
);