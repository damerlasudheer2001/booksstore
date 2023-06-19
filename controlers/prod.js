let multer=require('multer')
let uuid=require("uuid")
let prodmodel=require("../models/prod")
const cart = require('../models/cart')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './upimg')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' 
      + Math.round(Math.random() * 1E9)
cb(null, file.fieldname + '-' + 
uniqueSuffix+"."+file.mimetype.split("/")[1])
    }
  })
  const upload = multer({ storage: storage })
let savedata=(req,res)=>{
  let data={"_id":uuid.v4(),"img":req.file.filename,...req.body}
  let mdata=new prodmodel(data)
  mdata.save().then(()=>{
    res.send("ok")
  }).catch((err)=>{
    console.log(err)
  })


}

let getprod=async (req,res)=>{
  let data= await prodmodel.find()
  res.json(data)
}
let addcart=async(req,res)=>{
  let data=await cart.find({"pid":req.body.pid,"userid":req.body.userid})
  if(data.length==0)
  {
  let cartdata={"_id":uuid.v4(),...req.body,"total":req.body.price}
  let cdata=new cart(cartdata)
  cdata.save().then(()=>{
    res.end("ok")
  }).catch((err)=>{
    console.log("err")
  })
 
}
else{
  res.end("ok")
}
}

let gcdata=async(req,res)=>{
  
  let data=await cart.find({"userid":req.params.id})
  let total=0
  for(let i in data)
  {
   total=total+data[i].total
  }
  console.log(total)
  res.json({"cart":data,"total":total})
}
let delcart=async(req,res)=>{
  await cart.findByIdAndDelete({"_id":req.params.id})

  res.end("ok")
}
let incqty=async(req,res)=>{
  await cart.findByIdAndUpdate({"_id":req.body._id},{"qty":req.body.qty,"total":req.body.qty*req.body.price})
  res.end("ok")
}
module.exports={savedata,upload,getprod,addcart,gcdata,delcart,incqty}