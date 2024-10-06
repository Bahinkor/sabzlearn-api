const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const authRouter = require("./routes/v1/auth");

const app = express();

app.use("/courses/covers", express.static(path.join(__dirname, "/public", "courses", "covers")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(helmet());

app.use("/v1/auth", authRouter);

module.exports = app;