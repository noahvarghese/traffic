import express from "express";
import * as dotenv from "dotenv";
import { generateToken } from "./lib/Login";
import { getFlowData, hereTokenURL } from "./lib/HERE";
import { readCSV, osmToJson, shpToJson } from "./lib/File";
import { renderMap } from "./lib/Map";
dotenv.config({ path: __dirname + "/.env" });

(async () => {
    const app = express();

    app.use(express.urlencoded());
    app.use(express.json());

    const port = 4000;

    app.get("/", (req, res) => {
        res.sendFile(`${__dirname}/client/index.html`);
    });

    app.get("/d3", async (req, res) => {
        const filePath =
            "raw/road/town/shapefile/17350ba3-42d6-46fc-8463-a539124dc3bc2020329-1-1mla2qw.c8hg.shp";

        const output = await shpToJson(filePath);
        const map = await renderMap(output);
        res.send(map);
    });

    app.get("/shp", async (req, res) => {
        const filePath =
            "raw/road/town/shapefile/17350ba3-42d6-46fc-8463-a539124dc3bc2020329-1-1mla2qw.c8hg.shp";

        const output = await shpToJson(filePath);

        res.send(output);
    });

    app.get("/osm", async (req, res) => {
        // const output = await osmToJson("oakville_bbx");
        const output = await osmToJson("road/town/oakville");
        res.send(output);
    });

    app.get("/boundary", async (req, res) => {
        const boundary = await readCSV("raw/road/town/Town_Boundary.csv");
        res.send(boundary);
    });

    app.get("/flow", async (_, res) => {
        const flowToken = await generateToken(
            process.env.HERE_ACCESS_KEY_ID!,
            process.env.HERE_ACCESS_KEY_SECRET!,
            hereTokenURL
        );
        const bbox = "43.433981,-79.810854;43.480386,-79.626178";
        const flowData = await getFlowData(bbox, flowToken).catch((err) =>
            console.log(err)
        );
        res.send(flowData);
    });

    app.get("/map", async (req, res) => {
        const mapData = (await readCSV(
            "raw/road/town/Road_Network.csv"
        )) as any[];

        const streetName = req.query.streetName
            ? (req.query.streetName as string).toLowerCase()
            : "westoak trails blvd";

        const street = mapData.find(
            (item) => item.ROUTE.toLowerCase() === streetName
        );

        res.send(
            street === undefined
                ? `No road matching ' ${streetName} ' found.`
                : street
        );
    });

    app.listen(port, () => {
        console.log(`Server started on port: ${port}.`);
    });
})();
