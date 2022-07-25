const mongoose = require('mongoose')


let QAndAObject={
    Q:{name:String,data:String,userId:String},
    answerAr: [{name:String,data:String,userId:String}]
}
let lessonObject = {
    name: String,
    link:String,
    views_id: [String],
    FAQ :[QAndAObject],
    files_link:String
}

const courseSchema = new mongoose.Schema({
    short_id: Number,
    name: String,
    info: String,
    isActive: {
        type:Boolean,
        default:true
    },
    date_created:{
        type:Date,
        default:Date.now()
    },
    subscribes_users_id: [String],
    lessons: [lessonObject],
    categoryShortId:String,
    categoryName:String,
    price:Number,
    img_url:String,
    creator_id:String
})
exports.courseModel = mongoose.model("courses", courseSchema)
