const express = require("express");
const clientModel = require("../models/clientModel");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        let clients = await clientModel.find({}).sort({ _id: -1 });
        return res.json(clients)
    }
    catch (err) {
        console.log("get all clients failed" + err);
    }
})

router.post("/", async (req, res) => {
    try {
        let formData = req.body;
        await clientModel.create(formData.formData);
        res.json({ msg: "clientAded", newClient: formData.formData });
    }
    catch (err) {
        console.log(err)
        res.json("add client failed" + err);
    }
})

router.delete("/", async (req, res) => {
    try {
        let deletedCustomerId = req.body._id;
        const deletedCustomer = await clientModel.deleteOne({ _id: deletedCustomerId });
        res.json({ deletedCustomer: deletedCustomer });
    }
    catch (err) {
        console.log(err)
        res.json("remove client failed" + err)
    }
})





module.exports = router;