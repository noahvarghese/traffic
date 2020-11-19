import fs from "fs";
import csv from "csv-parser";
import { DOMParser } from "xmldom";
import osmtogeojson from "osmtogeojson";
import * as shapefile from "shapefile";

enum FileExtensions {
    JSON = "json",
    XML = "xml",
    OSM = "osm",
    SHP = "shp",
    GEOJSON = "geojson",
    CSV = "csv",
}

const absolutePath = (filePath: string) =>
    (filePath = `${__dirname}/../../data/${filePath}`);

export const writeData = (
    data: string,
    fileName: string,
    path: string = `${__dirname}/data/`
): Promise<boolean> => {
    return new Promise((res, _) => {
        const filePath = path + fileName;
        fs.writeFile(filePath, data, "utf8", () => {
            res(true);
        });
    });
};

export const checkFileSize = (relativePath: string): number => {
    const stats = fs.statSync(relativePath);
    const sizeInBytes = stats.size;

    // Convert to mega bytes
    const sizeInMegaBytes = sizeInBytes / (1024 * 1024);

    return sizeInMegaBytes;
};

export const readCSV = async (filePath: string) => {
    const results: any[] = [];

    return new Promise((res, rej) => {
        fs.createReadStream(absolutePath(filePath))
            .pipe(csv())
            .on("data", (data) => results.push(data))
            .on("end", () => {
                res(results);
            });
    });
};

export const readXML = async (filePath: string) => {
    const data = await readFile(filePath);
    const xmlParser = new DOMParser();
    const xmlData = xmlParser.parseFromString(data, "text/xml");
    return xmlData;
};

export const readFile = async (filePath: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.readFile(absolutePath(filePath), "utf8", (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

export const osmToJson = async (filePath: string) => {
    // get everything after data/raw in relative dir and just change raw to processed
    // create directory if necessary

    const osmData = await readXML(`raw/${filePath}.osm`);

    const output = osmtogeojson(osmData);

    saveDataFile(filePath, osmData, FileExtensions.GEOJSON);

    return output;
};

export const shpToJson = async (filePath: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        shapefile
            .open(absolutePath(filePath))
            .then((result) => {
                resolve(result);
            })
            .catch((err) => reject(err));
    });
};

export const saveDataFile = (
    originatingPath: string,
    data: any,
    extension: string
): void => {
    const paths = originatingPath.split("/");

    if (paths.length > 1) {
        paths.splice(-1, 1);
    }

    const newParentDir = `${__dirname}/../../data/processed/${paths.join("/")}`;

    if (paths.length > 1 && !fs.existsSync(newParentDir)) {
        fs.mkdirSync(newParentDir, { recursive: true });
    }

    const newPath = `${__dirname}/../../data/processed/${originatingPath}.${extension}`;

    fs.writeFileSync(
        newPath,
        isJson(data) ? JSON.stringify(data) : data.toString()
    );

    return;
};

const isJson = (str: any): boolean => {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
};
