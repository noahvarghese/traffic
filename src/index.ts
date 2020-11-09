import express from "express";
import axios from "axios";
import { generateToken } from "./lib/Login";

(async () => {
    const app = express();
    const port = 4000;

    const token = await generateToken();

    console.log(token);

    app.listen(port, () => {
        console.log(`Server started on port: ${port}.`);
    });
})();
