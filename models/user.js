let mongoose=require('mongoose')
let usersche=new mongoose.Schema({
    "_id":String,
    "name":String,
    "password":String,
    "phno":String,
    "role":{
        type:Number,
        default:101
    }

})
module.exports=mongoose.model("users",usersche)