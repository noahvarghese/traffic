import fs from "fs";

export const writeData = (
    data: string,
    fileName: string,
    path: string = `${__dirname}/data/`
): Promise<boolean> => {
    return new Promise((res, _) => {
        fs.writeFile(fileName, data, "utf8", () => {
            res(true);
        });
    });
};
