import axios from "axios";

import { writeData } from "./File";

const hereUrl = "https://traffic.ls.hereapi.com/traffic/6.2/flow.json";
export const hereTokenURL = "https://account.api.here.com/oauth2/token";

// Sample query
// "https://traffic.ls.hereapi.com/traffic/6.2/flow.xml?bbox=43.433981,-79.810854;43.480386,-79.626178";

export const getFlowData = (bbox: string, token: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        axios
            .get(hereUrl, {
                headers: { Authorization: `Bearer ${token}` },
                params: { bbox },
            })
            .then((res) => res.data)
            .then(async (data) => {
                // tslint:disable-next-line: no-unused-expression
                (await writeData("here/flowData.json", data)) && resolve(data);
            })
            .catch((err) => reject(err));
    });
};
