
import exp from 'express';
import {ArticleModel} from "../models/articleModel.js"
import { register } from '../services/AuthServices.js';
import { UserTypeModel  } from '../models/userModel.js';
import { checkAuthor } from '../middleware/checkAuthor.js';
import { verifyToken } from '../middleware/verifyToken.js';
export const authorRoutes = exp.Router();
//register author public route
authorRoutes.post('/users',async(req,res)=>{
    let userObj=req.body;
    const newUserObj=await register({...userObj,role:"AUTHOR"})
    res.status(200).json({message:"user created",payload:newUserObj})

})
//authentication authorpublic route

//create article public route
authorRoutes.post('/article',async(req,res)=>{
    let article=req.body
    let CheckAuth= await UserTypeModel.findById(article.author)
    if(!CheckAuth){
        return res.status(401).json({message:"not an author"})
    }
    let articleDoc=new ArticleModel(article)
    let createdArticle=await articleDoc.save()
    return res.status(201).json({message:"article created",payload:createdArticle})


})
//edit article
//delete article
//read articles
authorRoutes.get("/articles/:authorId",verifyToken,checkAuthor, async(req,res)=>{
    let AuthorId=req.params.authorId
    // let CheckAuth= await UserTypeModel.findById(AuthorId)
    // if(!CheckAuth){
    //     return res.status(401).json({message:"not an author"})

    // }
    let Articles=await ArticleModel.find({author:AuthorId,isArticleActive:true}).populate("author","firstName email" )
    res.status(200).json({message:"all the articles",payload:Articles})
})
//edit article(protected route)
authorRoutes.put("/articles",verifyToken ,checkAuthor,async (req, res) => {
  //get modified article from req
  let { articleId, title, category, content,author } = req.body;
  //find article
  let articleOfDB = await ArticleModel.findOne({_id:articleId,author:author});
  if (!articleOfDB) {
    return res.status(401).json({ message: "Article not found" });
  }
  
  //update the article
  let updatedArticle = await ArticleModel.findByIdAndUpdate(
    articleId,
    {
      $set: { title, category, content },
    },
    { new: true },
  );
  //send res(updated article)
  res.status(200).json({ message: "article updated", payload: updatedArticle });
});

//soft delete
authorRoutes.delete('/article/:id',checkAuthor,async(req,res)=>{
    let articleId=req.params.id
    let deleteArticle= await ArticleModel.findById(articleId)
    if(!deleteArticle)
    {
        return res.status(401).json({message:"not found "})
    }
    let updatedArticle=await ArticleModel.findByIdAndUpdate(articleId,{$set :{isArticleActive:false}},{new:true})
    res.status(201).json({message:"updarted ",payload:updatedArticle})  
})
