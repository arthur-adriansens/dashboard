/** @format */

import express from "express";
import cors from "cors";
console.log(process.env.test);

class Server {
    constructor(port) {
        this.app = express();
        this.port = port;

        this.get_requests();
        this.start_server();
    }

    start_server() {
        app.use(cors());
        app.listen(port, console.log(`Listening on port ${port}`));
    }

    get_requests() {
        app.get("/", (req, res) => {
            res.send("Hello World!");
        });

        app.get("/check_status", (req, res) => {
            res.send("connected");
        });

        app.get("/unread_mails", (req, res) => {
            res.send("connected");
        });
    }

    get_emails() {}
}

const server = new Server();
