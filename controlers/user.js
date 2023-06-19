let usermodel=require("../models/user")
let bcrypt=require('bcrypt')
var jwt = require('jsonwebtoken');
let adduser=async (req,res)=>{
    let result=await usermodel.findById({"_id":req.body._id})
    if(result)
    {
        res.status(203).send("user data available")
    }
    else{
        let pwdhash=await bcrypt.hash(req.body.password,10)
        let newdata={...req.body,"password":pwdhash}

    let data=new usermodel(newdata)
    data.save().then(()=>{
        res.send("ok")
    }).catch((err)=>{
        console.log(err)
    })
}
}

let login=async(req,res)=>{
    let result=await usermodel.findById({"_id":req.body._id})
    if(result)
    {
        let s=await bcrypt.compare(req.body.password,result.password)
        
        if(s)
        {
            let token=jwt.sign({"_id":req.body._id},"rsr")
            res.json({"token":token,"name":result.name,"_id":result._id,"role":result.role})
        }
        else{
            res.status(203).send("check password")
        }

    }
    else{
        res.status(203).send("mail id is worng ")
    }
}
let isAuth=(req,res,next)=>{
    try
    {
    let rs=jwt.verify(req.headers.authorization,"sudheer")
    if(rs)
    {
        next()
    }
}
catch(err)
{
           res.send("provide valid token")
   }
}

let isAdmin=async (req,res,next)=>{
    let data=await usermodel.findById({"_id":req.headers._id})
    if(data.role==101)
    {
        next()

    }
    else{
        res.send("you are not allowed to add product")
    }
}
module.exports={adduser,login,isAuth,isAdmin}