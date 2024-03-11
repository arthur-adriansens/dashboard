/** @format */

import express from "express";
import cors from "cors";
import { google } from "googleapis";

class Server {
    constructor(port = 3000) {
        this.app = express();
        this.port = port;

        this.get_requests();
        this.start_server();
    }

    start_server() {
        this.app.use(cors());
        this.app.listen(this.port, () => {
            console.log(`Listening on port ${this.port}`);
        });
    }

    get_requests() {
        this.app.get("/", (req, res) => {
            res.send("Hello World!");
        });

        this.app.get("/check_status", (req, res) => {
            res.send("connected");
        });

        this.app.get("/unread_mails", async (req, res) => {
            res.send(await this.get_emails());
        });
    }

    async get_emails() {
        // for token (see object inside auth.setCredentials) visit https://developers.google.com/oauthplayground/
        const auth = new google.auth.OAuth2(process.env.client_id, process.env.client_secret);

        auth.setCredentials({
            access_token:
                "ya29.a0Ad52N3-WgxmZaqT0VA2GYpJSO4xdBEh6DTXFHp5BiQYrh8akd1xr5jsfb5k5Hsw7ScjMIt-ojFVxJTASqflVRf4QNjPVY0-f7N_ivUSNTJ7UkRJ4CtmH3tQPOaYV45uXEh38rUksYyYr-EvSDVY89gtA8Cpn9dCCEhdjaCgYKASMSARESFQHGX2MiWb2jSL_5Z8rBvkAWob7cYg0171",
            scope: "https://mail.google.com/",
            token_type: "Bearer",
            expires_in: 3599,
            refresh_token: "1//046uoR2f2kVHNCgYIARAAGAQSNwF-L9IrpP5ARJAAxdb-F3HvgDvmiiPCHfRFhyJ30tel1wSSyT2ElD7Jd4W9DAmP7MHp81JU75U",
        });

        const gmail_client = google.gmail({ version: "v1", auth });
        const res = await gmail_client.users.messages.list({
            userId: process.env.user_id,
        });

        const messages = res.data.messages;
        result = [];
        for (const message of messages) {
            const msg = await gmail_client.users.messages.get({
                userId: process.env.user_id,
                id: message.id,
            });

            // find the email subject
            for (let object of msg.data.payload.headers) {
                if (object.name === "Subject") {
                    result.push(object.value);
                    break;
                }
            }
        }

        return result;
    }
}

const server = new Server();
await server.get_emails();
