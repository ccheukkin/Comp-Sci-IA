import express from "express";
import ExtractInterface from "ExtractInterface.js";
import RegexExtract from "../extracting/RegexExtract.js"

const extract = new ExtractInterface(RegexExtract);

const app = express();

app.get("/", (req, res) => {
    res.send("Hello There");
});

app.listen(4915, () =>
  console.log(`Listening!`),
);