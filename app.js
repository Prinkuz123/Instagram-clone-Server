
const express=require('express')
const app=express()
const port =5000
const cors=require('cors')
const mongoose=require('mongoose')
const mongoUrl=require('./key')



const  User=require('./Models/models')
app.use(express.json())
app.use(require('./routes/auth'))
app.use(cors())

mongoose.connect(mongoUrl)
mongoose.connection.on("connected",()=>{
    console.log("succesfully connected to mongodb")
})
mongoose.connection.on("error",()=>{
    console.log("connection error")
})
app.get('/',(req,res)=>{
    res.json("Hi aaaaaaaaaal")
})

app.listen(port,()=>{
    console.log(`server is running on ${port}`)
  
})