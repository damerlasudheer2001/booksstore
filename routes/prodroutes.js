let express=require('express')
let {savedata,upload, getprod, addcart, gcdata, delcart, incqty}=require("../controlers/prod")
const { isAuth,isAdmin} = require('../controlers/user')
let route=new express.Router()
route.post("/save",isAuth,isAdmin,upload.single('profimg'),savedata)
route.get("/getprod",getprod)
route.post("/addcart",isAuth,addcart)
route.get("/getcart/:id",isAuth,gcdata)
route.delete("/delcart/:id",isAuth,delcart)
route.put("/incqty",isAuth,incqty)

module.exports=route;