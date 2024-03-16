/** @format */

import express from "express";
import cors from "cors";
const Imap = require("imap");
const inspect = require("util").inspect;

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
                servername: "imap.gmail.com",
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
        try {
            const imap = new Imap(imapConfig);
            imap.once("ready", () => {
                imap.openBox("INBOX", false, () => {
                    imap.search(["UNSEEN", ["SINCE", new Date()]], (err, results) => {
                        const f = imap.fetch(results, { bodies: "" });
                        f.on("message", (msg) => {
                            msg.on("body", (stream) => {
                                simpleParser(stream, async (err, parsed) => {
                                    // const {from, subject, textAsHtml, text} = parsed;
                                    console.log(parsed);
                                });
                            });
                            msg.once("attributes", (attrs) => {
                                const { uid } = attrs;
                                // imap.addFlags(uid, ["\\Seen"], () => {
                                //     // Mark the email as read after reading it
                                //     console.log("Marked as read!");
                                // });
                            });
                        });
                        f.once("error", (ex) => {
                            return Promise.reject(ex);
                        });
                        f.once("end", () => {
                            console.log("Done fetching all messages!");
                            imap.end();
                        });
                    });
                });
            });

            imap.once("error", (err) => {
                console.log(err);
            });

            imap.once("end", () => {
                console.log("Connection ended");
            });

            imap.connect();
        } catch (error) {
            console.log(error);
        }
    }
}

const server = new Server();
await server.get_emails();
