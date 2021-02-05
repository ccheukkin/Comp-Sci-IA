// \/ USE CUSTOM CLASSES HERE \/
import ExtractClass from "./classes/extract/SimpleExtract.js"
import CategorizeClass from "./classes/categorize/KeywordCategorize.js"
import StoreClass from "./classes/store/MySqlStore.js"
// /\ USE CUSTOM CLASSES HERE /\

import fs from 'fs'
import apollo from 'apollo-server'
const { ApolloServer } = apollo;

// const extract: ExtractClass = SimpleExtract;
// const categorize: CategorizeClass = KeywordCategorize;
const store: StoreClass = new StoreClass();

const server = new ApolloServer({
    typeDefs:  fs.readFileSync('../graphql/schema.graphql', 'utf8'),
    resolvers:{
        Query:{
            getDoc: (parent, args)=>{
                store.getDoc(args.id);
            }
        }
    }
  });

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
);