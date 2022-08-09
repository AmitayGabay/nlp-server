const express = require("express");
const clientModel = require("../models/clientModel");
const router = express.Router();

router.get("/", (req, res) => {
    try {
        let clients = clientModel.find({})
        return res.json(clients)
    }
    catch(err){
        console.log(err)
    }
})

router.post("/", async (req, res) => {
    try {
        let formData = req.body;
        await clientModel.create(formData)
        res.json({ msg: "clientAded" })
    }
    catch (err) {
        console.log(err)
        res.json(err)
    }
})





module.exports = router;