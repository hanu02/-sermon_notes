const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
//creating express router
const app = express.Router();
//register
app.post('/register', async (req,res) =>{
  try{
    const {name,email,password} = req.body
    //check if the user exists 
   const existingUser = await User.findOne({email});
   if (existingUser){
    return res.status(400).json({message:'useralready exists'})
   }
   //hashing 

const salt = await bcrypt.genSalt(10);
const hashedPassword =await bcrypt.hash(password, salt);
const user = await User.create({name,email,password:hashedPassword});
res.status(201).json({
  _id:user._id,
  email:user.email,
 name: user.name

});
 }
 catch(error){
  res.status(500).json({message:'error message'});
 }
  }
);
//login
app.post('/login' ,async(req,res)=>{
  try{
    const{name,email,password} = req.body
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({message:'user not found please try again '});
}
  const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(400).json({message:'Invalid credentials'})
    }
    const token = jwt.sign(
      {id:user._id},
      process.env.JWT_SECRET,
      {expiresIn: '15d'}
    );
    res.status(200).json({
      _id:user._id,
      email: user.email,
      name:user.name,
      token,
    });
 }
 catch(error){
  res.status(500).json({message:"error message"})
 }
}
);
module.exports = app;