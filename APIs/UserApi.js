
import exp from 'express';
import { register,authenticate} from "../services/AuthServices.js"
import { verifyToken } from '../middleware/verifyToken.js';
import { checkAuthor } from '../middleware/checkAuthor.js';
import { UserTypeModel } from '../models/userModel.js';
import { ArticleModel } from '../models/articleModel.js';
export const userRoutes = exp.Router();
//register userRoutes here in fu
userRoutes.post('/users',async(req,res)=>{
    let userObj=req.body;
    const newUserObj=await register({...userObj,role:"USER"})
    res.status(200).json({message:"user created",payload:newUserObj})

})

//authentication user
//login success
userRoutes.post('/login',async(req,res)=>{
    let {email,password}=req.body;
    let token=await authenticate(email,password)
    if(!token)
    {
        return res.status(401).json({message:"invalid credentials"})
    }
    res.status(200).json({message:"login successful",token})
})



//read article
userRoutes.get('/users/:id',verifyToken,checkAuthor,async(req,res)=>{
    let userId=req.params.id
    let readUser=await ArticleModel.findById(userId)
    if(!readUser)
    {
        return res.status(404).json({meaasge:"the User is not found"})
    }
    res.status(201).json({message:"users data",payload:readUser})

})

//comments on article(protected route)
userRoutes.put('/comments',verifyToken,async(req,res)=>{
    //get articleId and comment from req body
    //find the article by id
    //if article not found then send the error message  
    //if article found then push the comment into comments array
    let {articleId,comment}=req.body
    let article=await ArticleModel.findById(articleId)
    if(!article)
    {
        return res.status(404).json({message:"article not found"})
    }
    article.comments.push(comment)
    await article.save()
    res.status(201).json({message:"comment added",payload:article})
})
// userRoutes.post('/authenticate',async(req,res)=>{
//     let userCred=req.body
//     let {token,user}=await authenticate(userCred)
//     res.cookie("token",token,{
//         httpOnly:true,
//         sameSite:"lax",
//         secure:false
//     })
//     res.status(200).json({message:"login success",payload:user})
// })
