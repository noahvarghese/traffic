import express from "express";
// import axios from "axios";
import * as dotenv from "dotenv";
import { loadCsvFile } from "./lib/readCSV";

dotenv.config({ path: __dirname + "/.env" });

(async () => {
    const mapData = (await loadCsvFile(
        __dirname + "/data/Road_Network.csv"
    )) as any[];
    console.log(Object.keys(mapData[0]));
    console.log(mapData.find((item) => item.ROUTE === "WESTOAK TRAILS BLVD"));
    const app = express();
    const port = 4000;

    app.get("/", async (req, res) => {
        res.send();
    });

    app.listen(port, () => {
        console.log(`Server started on port: ${port}.`);
    });
})();
