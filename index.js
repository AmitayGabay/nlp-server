const express = require("express")
const path = require("path")
const http = require("http")
const routesInit = require("./api/routes/routes-configuration")
const cors=require('cors')
const app = express()
require('./api/db/mongoConnect')
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
cors()

routesInit(app);
const server = http.createServer(app);
let port = process.env.PORT || "3000";
server.listen(port,()=>{console.log("api work")});

