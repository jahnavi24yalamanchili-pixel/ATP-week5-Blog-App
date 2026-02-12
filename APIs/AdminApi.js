
import exp from 'express';
import { UserTypeModel } from '../models/userModel.js';
export const adminRoutes = exp.Router(); 
//authenticate admin
adminRoutes.post('/authenticate',async(req,res)=>{
    //first we will check the credentials of admin
    //if credentials are correct then we will send the admin data
    //if credentials are incorrect then we will send the error message
    let {email,password}=req.body
    let admin=await UserTypeModel.findOne({email,password,role:"ADMIN"})
    if(!admin)
    {
        return res.status(401).json({message:"invalid credentials"})
    }
    res.status(200).json({message:"authentication successful",payload:admin})
})


//read all articles
adminRoutes.get('/articles',async(req,res)=>{
    let articles=await ArticleModel.find().populate("author","firstName email")
    res.status(200).json({message:"all the articles",payload:articles})
})      

//block 
//block user
adminRoutes.put('/block/:id',async(req,res)=>{
    //first we will check the user is present or not
    //if user is present then we will block the user by setting isActive to false
    //if user is not present then we will send the error message
    let uid=req.params.id
    let userid=await UserTypeModel.findById(uid)
    if(!userid)
    {
        return res.status(404).json({message:"not found"})
    }
    let blockedUser=await UserTypeModel.findByIdAndUpdate(uid,{$set:{isActive:false}},{new:true})
    
   
    res.status(201).json({message:"user is blocked ",blockedUser}) 


})
// //unblock user
adminRoutes.put('/unblock/:id',async(req,res)=>{
    //first we will check the user is present or not
    //if user is present then we will unblock the user by setting isActive to true
    //if user is not present then we will send the error message
    let uid=req.params.id
    let userid=await UserTypeModel.findById(uid)
    if(!userid)
    {
        return res.status(404).json({message:"not found"})
    }
    let unblockedUser=await UserTypeModel.findByIdAndUpdate(uid,{$set:{isActive:true}},{new:true})
    
   
    res.status(201).json({message:"user is blocked ",unblockedUser}) 
})
