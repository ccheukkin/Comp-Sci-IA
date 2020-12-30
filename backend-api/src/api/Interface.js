import express from "express";
import ExtractInterface from "./ExtractInterface.js";
import CategorizeInterface from "./CategorizeInterface.js";
import SimpleExtract from "../extraction/SimpleExtract.js";
import KeywordCategorize from "../categorizing/KeywordCategorize.js";
import QueryingInterface from "./QueryingInterface.js";
import LocalFileStore from "../storage/LocalFileStore.js";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import cors from "cors";

let storeClass = new LocalFileStore();
const extract = new ExtractInterface(new SimpleExtract(), storeClass);
const categorize = new CategorizeInterface(new KeywordCategorize(), storeClass);
const query = new QueryingInterface(storeClass);

const app = express();
app.use(cors());
app.use(fileUpload({
  createParentPath: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post("/api/extract/upload", async (req, res) => {
  let doc = req.files.doc;
  let tryParse = parseInt(req.query.docId);
  let docId = tryParse == 0 || tryParse ? tryParse : extract.getDocId();
  let docDir = `${extract.getDocDir(docId)}/${doc.name}`;
  let isAnswer = parseInt(req.query.answer) ? true : false;
  await doc.mv(docDir);
  await extract.extract(docId, docDir, {answer: isAnswer});
  res.send({docId});
})

app.post("/api/extract/set", async (req, res) => {
  await extract.setContent(req.query, req.body.object, req.files);
  res.send("OK");
});

app.get("/api/categorize/start", async (req, res) => {
  await categorize.categorize(req.query.docId);
  res.send("OK");
});

app.post("/api/categorize/set", (req, res) => {
  let status = await categorize.setCategories(req.query, req.body.categories);
  res.send(status);
});

app.get("/api/query/review", async (req, res) => {
  let packets = await query.getReview(parseInt(req.query.docId));
  res.send({packets});
});

app.post("/api/query/get", async (req, res) => {
  let questions = await query.query(req.body.options);
  res.send(questions);
});

app.listen(4915, () =>
  console.log(`Listening!`),
);