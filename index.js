/** @format */

import express from "express";
import cors from "cors";
const app = express();
const port = 3000;

app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/check_status", (req, res) => {
    res.send("connected");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
