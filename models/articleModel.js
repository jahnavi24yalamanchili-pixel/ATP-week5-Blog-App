
import {Schema,model} from 'mongoose'
const commentSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'},
    Comment:
{
        type:String,

}})
const articleSchema=new Schema({
    author:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:[true,"AuthorID is required"]
    },
    title:{
        type:String,
        required:[true,"Title is required"]
    },
    category:{
        type:String,
        required:[true,"Category is required"]
    },
    content:{
        type:String,
        required:[true,"Content is required"]
    },
    comments:{
        type:[commentSchema],
    },
    isArticleActive:{
        type:Boolean,
        default:true
    },
}
,{
    timestamps:true,
    strict:"throw",
versionKey:false})
export const ArticleModel=model('article',articleSchema);