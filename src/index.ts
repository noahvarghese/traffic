import express from "express";
// import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });

(async () => {
    const app = express();
    const port = 4000;

    app.listen(port, () => {
        console.log(`Server started on port: ${port}.`);
    });
})();
