
const express=require("express")
const app=express()
const cors=require("cors")
const bodyParser=require("body-parser")
const port= process.env.PORT||5000;
const mongoose=require("mongoose")
const Content=require("./schema")

app.use(bodyParser.urlencoded({
    extended:true
}))

app.use(bodyParser.json())
app.use(cors())

mongoose.connect("mongodb+srv://kalyanreddy:kalyanreddy@cluster0.iaegfrs.mongodb.net/firstdb?retryWrites=true&w=majority")
 .then(()=>{
    console.log("Mongodb connected succesfully")
 })
  .catch((err)=>{
    console.log(err)
    })

app.get("/",(req,res)=>{
    res.send("API is working")
}) 

app.get("/users",async(req,res)=>{
   await Content.find()
    .then(found=>res.json(found))
})

app.post("/store",(req,res)=>{
     const {username,password}=req.body
     const newData=new Content({
        username,password
     })
     newData.save()
})

app.listen(4000,()=>console.log("server started successfully"))