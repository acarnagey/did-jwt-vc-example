import express from "express";
import path from "path";
import render from "./serverRender";
import router from "./routes";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());
app.use(router);

const assetPath = path.join(__dirname, "assets");
app.use("/assets", express.static(assetPath));
app.use(render);

app.listen(5000, () =>
  // tslint:disable-next-line: no-console
  console.log(`app listening at http://localhost:${5000}`)
);
