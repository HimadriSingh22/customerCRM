const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const useragent = require("express-useragent");
const indexRouter=require("./routes/index");
require("dotenv").config();

//const { defaultErrHandler } = require("./errors/index");

const { connectToDB } = require("./db");


const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(useragent.express());
app.use(cookieParser());

app.use("/api", indexRouter);

// app.use((err, req, res, next) => {
//   defaultErrHandler(err, req, res, next);
// }); 

connectToDB();

module.exports = app;
