import express from "express";
import * as dotenv from "dotenv";
import { generateToken } from "./lib/Login";
import { getFlowData, hereTokenURL } from "./lib/HERE";
dotenv.config({ path: __dirname + "/.env" });

(async () => {
    const app = express();
    const port = 4000;

    const flowToken = await generateToken(
        process.env.HERE_ACCESS_KEY_ID!,
        process.env.HERE_ACCESS_KEY_SECRET!,
        hereTokenURL
    );
    const bbox = "43.433981,-79.810854;43.480386,-79.626178";
    const flowData = getFlowData(bbox, flowToken);
    console.log(flowData);

    app.listen(port, () => {
        console.log(`Server started on port: ${port}.`);
    });
})();
