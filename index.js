require("@babel/register");
import consign from "consign";
import express from "express"

const app = express();

consign({verbose: false})
    .include('libs/config.js')
    .then("libs/middlewares.js")
    .then("routes")
    .then("libs/boot.js")
    .into(app);

module.exports = app;