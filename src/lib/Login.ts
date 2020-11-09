import axios from "axios";
import OAuth from "node-oauth-1.0a-ts";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../.env" });

export const generateToken = () => {
    return new Promise((resolve, _) => {
        const oauth = new OAuth({
            consumer: {
                public: process.env.ACCESS_KEY_ID!,
                secret: process.env.ACCESS_KEY_SECRET!,
            },
            signature_method: "HMAC-SHA256",
            version: "1.0",
        });

        const authHeader = oauth.getHeader(
            {
                method: "POST",
                url: process.env.ENDPOINT_URL!,
            },
            {
                key: "",
                public: "",
                secret: "",
            }
        );

        axios
            .post(
                process.env.ENDPOINT_URL!,
                { grantType: "client_credentials" },
                {
                    headers: { Authorization: authHeader },
                }
            )
            .then((res) => resolve(res.data.accessToken))
            .catch((err) => console.log(err));
    });
};
