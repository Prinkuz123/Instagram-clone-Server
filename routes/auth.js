const express=require('express')
const router=express.Router()
const User=require('../Models/models')
const bcrypt=require('bcrypt')

router.get('/',(req,res)=>{
    res.send("Hellooo")
}) 
router.post('/signup',(req,res)=>{
    console.log(req.body)
   const {username,email,password}=req.body
   if (!username || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
}

User.findOne({$or:[{email:email},{username:username}]}).then((savedUser)=>{
    // console.log("saveduser:"+savedUser)
if(savedUser){
    return res.status(422).json({error:"User with this email id or username already exists"})
}
bcrypt.hash(password,12).then((hashedPasswword)=>{
    const user=new User({username,email,password:hashedPasswword})
    user.save()
    .then(user=>{res.json({message:"Saved successfully",data:user})})
 .catch(error=>{console.log(error)})
})
 

})
   
})

module.exports=router

// BCRYPT INSTALLED