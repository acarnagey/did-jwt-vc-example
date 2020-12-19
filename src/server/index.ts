import express from "express";
import path from "path";
import render from "./serverRender";


const app = express();

// app.get("/", (_, res) => {
//     res.sendFile(path.join(__dirname + "/index.html"));
// });

const assetPath = path.join(__dirname, "assets");
app.use("/assets", express.static(assetPath));
app.use(render);

app.listen(5000, () =>
  // tslint:disable-next-line: no-console
  console.log(`app listening at http://localhost:${5000}`)
);