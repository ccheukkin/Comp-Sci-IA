import express from "express";
import ExtractInterface from "./ExtractInterface.js";
import SortingInterface from "./SortingInterface.js";
import SimpleExtract from "../extracting/SimpleExtract.js";
import KeywordSort from "../sorting/KeywordSort.js";
import LocalFileStore from "../storing/LocalFileStore.js";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import cors from "cors";

const extract = new ExtractInterface(new SimpleExtract(), new LocalFileStore());
const sort = new SortingInterface(new KeywordSort(), new LocalFileStore());

const app = express();
app.use(cors());
app.use(fileUpload({
  createParentPath: true
}));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

app.post("/api/extract/upload", (req, res) => {
  let docx = req.files.docx;
  let docId = parseInt(req.query.docId) ? parseInt(req.query.docId) : extract.getDocId();
  let docDir = `${extract.getDocDir(docId)}/${docx.name}`;
  docx.mv(docDir);
  let isAnswer = parseInt(req.query.answer) ? true : false;
  extract.extract(docDir, docId, {answer: isAnswer});
  res.send({docId});
})

app.get("/api/extract/review", async (req, res) => {
  let packets = await extract.getReview(parseInt(req.query.docId));
  res.send(packets);
});

app.post("/api/extract/add", (req, res) => {
  console.log(req.body);
});

app.get("/api/extract/done", (req, res) => {
  sort.sort(req.query.docId);

});

app.get("/api/sort/review", async (req, res) => {
  let packets = await sort.getReview(parseInt(req.query.docId));
  res.send(packets);
});

app.post("/api/sort/modify", (req, res) => {
  console.log(req.body);
});

// app.get("/packets", async (req, res) => {
//   let packets = await extract.getReview(JSON.parse(req.query.ids));
//   res.send(packets);
// });

app.listen(4915, () =>
  console.log(`Listening!`),
);