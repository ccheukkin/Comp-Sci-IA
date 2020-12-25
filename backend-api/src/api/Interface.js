import express from "express";
import ExtractInterface from "./ExtractInterface.js";
import DefaultExtract from "../extracting/DefaultExtract.js";
import LocalFileStore from "../storing/LocalFileStore.js"
import fileUpload from "express-fileupload";
import cors from "cors";

const extract = new ExtractInterface(new DefaultExtract(), new LocalFileStore());

const app = express();
app.use(cors());
app.use(fileUpload({
  createParentPath: true
}));
// app.use(bodyParser.text());
// app.use(bodyParser.urlencoded({extended: true}));

app.post("/upload", (req, res) => {
  let docx = req.files.docx;
  let docId = req.query.docId ? req.query.docId : extract.getDocId();
  let docDir = `${extract.getDocDir(docId)}/${docx.name}`;
  docx.mv(docDir);
  let isAnswer = parseInt(req.query.answer) ? true : false;
  extract.extract(docDir, docId, {answer: isAnswer});
  res.send({
    status: true,
    message: 'File is uploaded',
    data: docId
  });
})

app.get("/doc", async (req, res) => {
  let packets = await extract.getReview(req.query.id);
  res.send(packets);
});

// app.get("/packets", async (req, res) => {
//   let packets = await extract.getReview(JSON.parse(req.query.ids));
//   res.send(packets);
// });

app.listen(4915, () =>
  console.log(`Listening!`),
);