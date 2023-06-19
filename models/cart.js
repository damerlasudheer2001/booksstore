let mongoose=require("mongoose")
let cartsche=new mongoose.Schema({"_id":String,
"pid":String,
"pname":String,
"price":Number,
"img":String,
"qty":Number,
"userid":String,
"total":Number
})
module.exports=mongoose.model("cart",cartsche)