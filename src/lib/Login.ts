import { rejects } from "assert";
import axios from "axios";
import OAuth from "node-oauth-1.0a-ts";

export const generateToken = (
    id: string,
    secret: string,
    url: string
): Promise<string> => {
    return new Promise((resolve, _) => {
        const oauth = new OAuth({
            consumer: {
                public: id,
                secret,
            },
            signature_method: "HMAC-SHA256",
            version: "1.0",
        });

        const authHeader = oauth.getHeader(
            {
                method: "POST",
                url,
            },
            {
                key: "",
                public: "",
                secret: "",
            }
        );

        axios
            .post(
                url,
                { grantType: "client_credentials" },
                {
                    headers: { Authorization: authHeader },
                }
            )
            .then((res) => resolve(res.data.accessToken))
            .catch((err) => rejects(err));
    });
};
