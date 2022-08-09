const {mongoUserName,mongoPassword}=require('../../config/secret.js')
const mongoose=require('mongoose')
mongoose.connect(`mongodb+srv://${mongoUserName}:${mongoPassword}@cluster0.t0e15tv.mongodb.net/nlp`)
