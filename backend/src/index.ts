import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World from TypeScript Express");
});

app.listen(3000, () => {
  console.log("서버 시작중...")
});