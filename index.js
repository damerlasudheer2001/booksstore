let express=require('express')
let mongoose=require('mongoose')
let cors=require('cors')
let route=require('./routes/prodroutes')

let app=express()
app.use(cors())
app.use(express.json())
app.use("/imgs",express.static('upimg'))
let bodyParser=require("body-parser")                                        
const userroute = require('./routes/userroutes')
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
mongoose.connect("mongodb://127.0.0.1:27017/bookstore",{
    useNewUrlParser: true ,useUnifiedTopology:true}).then(()=>{
        console.log("ok")
    }).catch((err)=>{
        console.log(err)
    })
app.use("/",route)
app.use("/",userroute)

app.listen(4040)