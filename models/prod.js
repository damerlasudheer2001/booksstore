let mongoose=require("mongoose")
let prodsche=new mongoose.Schema({"_id":String,
"pname":String,
"cat":String,
"price":Number,
"img":String,
"desc":String,
"rating":Array,
"comments":Array})
module.exports=mongoose.model("pros",prodsche)