import express from "express";
import axios from "axios";
import { generateToken } from "./lib/Login";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });

(async () => {
    const app = express();
    const port = 4000;

    const token = await generateToken();

    axios
        .get(process.env.FLOW_URL!, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                bbox: "43.433981,-79.810854;43.480386,-79.626178",
            },
        })
        .then((res) => console.log(JSON.stringify(res.data)))
        .catch((err) => console.log(err));

    app.listen(port, () => {
        console.log(`Server started on port: ${port}.`);
    });
})();
