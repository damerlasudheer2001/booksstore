let express=require('express')
let {adduser, login}=require('../controlers/user')
let userroute=new express.Router()
userroute.post("/add",adduser)
userroute.post("/login",login)
module.exports=userroute