const express = require("express");
const clientModel = require("../models/clientModel");
const router = express.Router();

router.get("/", async(req, res) => {
    try {
        let clients =await clientModel.find({}).sort({_id:-1});
        return res.json(clients)
    }
    catch(err){
        console.log(err)
    }
})

router.post("/", async (req, res) => {
    try {
        let formData = req.body;
        await clientModel.create(formData.formData)
        res.json({ msg: "clientAded" })
        console.log("inner")
        console.log(req.body)
    }
    catch (err) {
        console.log(err)
        res.json(err)
    }
})





module.exports = router;