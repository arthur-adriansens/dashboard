/** @format */

import express from "express";
import cors from "cors";
import imaps from "imap-simple";

class Server {
    constructor(port = 3000) {
        // server setup
        this.app = express();
        this.port = port;

        // email setup
        this.email_config = {
            imap: {
                user: process.env.EMAIL_USER,
                password: process.env.APP_PASSWORD,
                host: "imap.gmail.com",
                port: 993,
                tls: true,
                authTimeout: 3000,
            },
        };
        this.search_criteria = ["UNSEEN"];
        this.fetch_options = {
            bodies: ["HEADER", "TEXT"],
            markSeen: false,
        };

        this.start_server();
    }

    start_server() {
        this.get_requests();
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
        imaps.connect(this.email_config).then(function (connection) {
            return connection.openBox("INBOX").then(function () {
                return connection.search(this.search_criteria, this.fetch_options).then(function (results) {
                    var subjects = results.map(function (res) {
                        return res.parts.filter(function (part) {
                            return part.which === "HEADER";
                        })[0].body.subject[0];
                    });

                    console.log(subjects);
                });
            });
        });
    }
}

const server = new Server();
await server.get_emails();
