import * as dotenv from "dotenv";
import { Express } from "express";
import express from "express";
import errorHandle from "./Middleware/error-handle";
import db from "./Config/data-source";
import morgan from "morgan";
import router from "./Routes";
import bodyParser from "body-parser";
import cors from "cors";
async function main() {
  const app: Express = express();

  dotenv.config();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(morgan("dev"));
  app.use(cors());

  db.setAppDataSource(process.env);
  db.getAppDataSource()
    .initialize()
    .then(() => {})
    .catch((error) => console.log(error));

  router(app);
  app.use(errorHandle);
  const PORT = 5000;
  app.listen(PORT, () => {
    console.log("server listening on port " + PORT);
  });
}
main();