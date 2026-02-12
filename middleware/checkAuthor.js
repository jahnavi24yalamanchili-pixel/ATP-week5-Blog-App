
import { UserTypeModel } from "../models/userModel.js"
export const checkAuthor =async(req,res,next)=>
{
    let AuthorId=req.params.authorId|| req.body.author
    let author=await UserTypeModel.findById(AuthorId)
    if(!author)
    {
        return res.status(401).json({message:"invalid author "})
    }
    if(!author.isActive)
    {
        return res.status(403).json({message:"author acount is not active"})
    }
    next()
    // let CheckAuth= await UserTypeModel.findById(article.author)
    //     if(!CheckAuth){
    //         return res.status(401).json({message:"not an author"})
    //     }
}
