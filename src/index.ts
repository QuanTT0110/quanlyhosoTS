import * as dotenv from "dotenv";
import express from "express";
import { AppDataSource } from "./data-source";
import errorHandle from "./middleware/error-handle";
import morgan from "morgan";
import router from "./routes";
import bodyParser from "body-parser";

async function main() {
    
    dotenv.config();

    AppDataSource.initialize()
        .then(async () => {
            const app = express();
            app.use(bodyParser.urlencoded({ extended: true }));
            app.use(bodyParser.json());
            app.use(morgan("dev"));

            app.use(router);
            app.use(errorHandle);
            const PORT = process.env.PORT || 5000;
            app.listen(PORT, () => {
                console.log("server listening on port " + PORT);
            });
        })
        .catch((error) => console.log(error));
}

main();