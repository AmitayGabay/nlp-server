const clientR = require("./clientRoute.js")

const routesInit = app => {
    app.use("/client", clientR)
    app.use("", (req, res) => res.json({ msg: "error", err: 404 }))
}

module.exports = routesInit;



