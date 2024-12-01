/** @format */

import express from "express";
import cors from "cors";
import { google } from "googleapis";
import Pop3Command from "node-pop3";

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
        this.app.use(express.static("src"));

        this.app.get("/", (req, res) => {
            res.sendFile(path.join(__dirname, "/src/main.html"));
        });

        this.app.get("/check_status", (req, res) => {
            res.send("connected");
        });

        this.app.get("/unread_mails", async (req, res) => {
            res.send(await this.get_emails());
        });
    }

    async get_emails() {
        const pop3 = new Pop3Command({
            user: process.env.EMAIL_USER,
            password: process.env.APP_PASSWORD, // not usual password! account => 2 step verification => scroll down => app password
            host: "pop.gmail.com",
            servername: "pop.gmail.com",
            port: 995,
            tls: true,
        });

        const list = await pop3.LIST();
        console.log(list);
        await pop3.QUIT();
    }
}

const server = new Server();
await server.get_emails();
