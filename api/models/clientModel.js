const { default: mongoose } = require("mongoose");

const clientSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    gender: String,
    age:String,
    phone:String,
    mail:String,
})

module.exports =mongoose.model("clients",clientSchema)