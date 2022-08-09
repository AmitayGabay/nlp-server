const express = require("express");

const clientR = require("./clientRoute.js")

const routesInit = app => {
    app.use("/client",clientR)


    app.use("", (req, res) => res.json({ msg: "xzzzzzz", err: 404 }))
}

module.exports = routesInit;



