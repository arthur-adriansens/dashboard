/** @format */

import Pop3Command from "node-pop3";

const pop3 = new Pop3Command({
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
    host: "pop.gmail.com",
    servername: "pop.gmail.com",
    port: 995,
    tls: true,
});

console.log("getting mail...");
const list = await pop3.LIST();
console.log(list);

console.log("quitting...");
await pop3.QUIT();
console.log("done!");
