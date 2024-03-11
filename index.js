/** @format */

import express from "express";
import cors from "cors";

class Server {
    constructor(port) {
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

        this.app.get("/unread_mails", (req, res) => {
            res.send("connected");
        });
    }

    get_emails() {}
}

const server = new Server();
