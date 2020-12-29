import express from "express";
import ExtractInterface from "./ExtractInterface.js";
import CategorizeInterface from "./CategorizeInterface.js";
import SimpleExtract from "../extraction/SimpleExtract.js";
import KeywordCategorize from "../categorizing/KeywordCategorize.js";
import LocalFileStore from "../storage/LocalFileStore.js";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import cors from "cors";

const extract = new ExtractInterface(new SimpleExtract(), new LocalFileStore());
const categorize = new CategorizeInterface(new KeywordCategorize(), new LocalFileStore());

const app = express();
app.use(cors());
app.use(fileUpload({
  createParentPath: true
}));
// app.use(bodyParser.json());
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

app.get("/api/extract/review", async (req, res) => {
  let packets = await extract.getReview(parseInt(req.query.docId));
  res.send({packets});
});

app.post("/api/extract/set", async (req, res) => {
  extract.setContent(req.query, req.body.object, req.files.object);
  res.send("OK");
});

app.get("/api/extract/done", async (req, res) => {
  await categorize.categorize(req.query.docId);
  res.send("OK");
});

app.get("/api/categorize/review", async (req, res) => {
  let packets = await categorize.getReview(parseInt(req.query.docId));
  res.send(packets);
});

app.post("/api/categorize/set", (req, res) => {
  categorize.setCategories(req.body);
  res.send("OK");
});

app.post("/api/query/get", (req, res) => {

});

// app.get("/packets", async (req, res) => {
//   let packets = await extract.getReview(JSON.parse(req.query.ids));
//   res.send(packets);
// });

app.listen(4915, () =>
  console.log(`Listening!`),
);