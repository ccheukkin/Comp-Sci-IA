import * as name from "./wrappers"
import ExtractClass from "./classes/extract/extract.schema"
import CategorizeClass from "./classes/categorize/categorize.schema"
import StoreClass from "./classes/store/store.schema"
import ExtractInterface from "./interfaces/extract"
import CategorizeInterface from "./interfaces/categorize"
import QueryInterface from "./interfaces/query"

import express from "express";
import fileUpload from "express-fileupload"
import bodyParser from "body-parser"
import cors from "cors"

// \/ USE CUSTOM CLASSES HERE \/
import SimpleExtract from "./classes/extract/SimpleExtract"
import KeywordCategorize from "./classes/categorize/KeywordCategorize"
import LocalFileStore from "./classes/store/LocalFileStore"

const extractClass: ExtractClass = SimpleExtract;
const categorizeClass: CategorizeClass = KeywordCategorize;
const storeClass: StoreClass = LocalFileStore;
// /\ USE CUSTOM CLASSES HERE /\

const extract = new ExtractInterface(extractClass, storeClass);
const categorize = new CategorizeInterface(categorizeClass, storeClass);
const query = new QueryInterface(storeClass);