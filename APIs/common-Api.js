
import exp from 'express'
import { verifyToken } from '../middleware/verifyToken.js'
import { authenticate } from '../services/AuthServices.js'
import { UserTypeModel } from '../models/userModel.js'
export const commonRouter=exp.Router()
commonRouter.post("/login",async(req,res)=>{
    //it is used to authenticate user and admin both
    //we will check the credentials of user/admin
    //if credentials are correct then we will send the token and user data
    //if credentials are incorrect then we will send the error message
let userCred=req.body
    let {token,user}=await authenticate(userCred)
    res.cookie("token",token,{
        httpOnly:true,
        sameSite:"lax",
        secure:false
    })
    res.status(200).json({message:"login success",payload:user})
})

commonRouter.get('/logout',(req,res)=>{
    //it is used to logout user and admin both
    //we will clear the token from cookie
    //we will send the logout success message
    res.clearCookie('token',
        {
            httpOnly:true,
            secure:false,
            sameSite:'lax'
        }
    )
    res.status(200).json({message:" logged out successfuly"})
})
commonRouter.put('/change-password', verifyToken, async(req,res)=>{
    let { oldPassword, newPassword } = req.body;//get userId from req.userId set by verifyToken middleware
    let userId = req.userId;//get user from DB using userId

    let user = await UserTypeModel.findById(userId);//if user not found then send the error message

    if (!user) {
        return res.status(404).json({message:"User not found"});
    }

    let isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
        return res.status(401).json({message:"Old password incorrect"});
    }

    let hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;//save the user with new password
    await user.save();

    res.status(200).json({message:"Password changed successfully"});
});


    
    
    
