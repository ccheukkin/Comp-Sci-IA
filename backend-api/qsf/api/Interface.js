import express from "express";
import ExtractInterface from "./ExtractInterface.js";
import DefaultExtract from "../extracting/DefaultExtract.js"
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";

const extract = new ExtractInterface(DefaultExtract);

const app = express();
app.use(fileUpload({
  createParentPath: true
}));
// app.use(bodyParser.text());
// app.use(bodyParser.urlencoded({extended: true}));

app.get("/packets", (req, res) => {
    res.send({
      a: 1,
      b: {
        b1: 1, b2: [2, 2, 2]
      }
    });
    console.log(req.query);
});

app.get("/", (req, res) => {
  res.send("Hello There");
  console.log(req.body);
});

app.post("/upload", (req, res) => {
  let docx = req.files.docx;
  docx.mv(docx.name);
  res.send("Received");
})

app.listen(4915, () =>
  console.log(`Listening!`),
);