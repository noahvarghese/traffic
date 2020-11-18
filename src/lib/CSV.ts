import fs from "fs";
import csv from "csv-parser";

export const loadCsvFile = (fileName: string) => {
    const results: any[] = [];

    return new Promise((res, rej) => {
        fs.createReadStream(fileName)
            .pipe(csv())
            .on("data", (data) => results.push(data))
            .on("end", () => {
                res(results);
            });
    });
};
