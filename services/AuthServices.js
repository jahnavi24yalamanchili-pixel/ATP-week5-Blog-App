import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import {UserTypeModel} from "../models/userModel.js"
import {config} from 'dotenv'
config()

export const register =async (userobj)=>{

const user=new UserTypeModel(userobj)//create  new document
await user.validate()//validate the passwords
user.password=await bcrypt.hash(user.password, 10)//hash and replace the plain password
const created = await user.save()//save
const newUserObj=created.toObject()//convert password into object to remove password
delete newUserObj.password//remove the password
return newUserObj//returning the obj without password
}
export async function authenticate(userCred) {
    //it is used to authenticate user and admin both
    //we will check the credentials of user/admin
    //if credentials are correct then we will send the token and user data
    //if credentials are incorrect then we will send the error message
    ///we will use jwt for authentication and bcrypt for password hashing
    let { email, password } = userCred;

    let user = await UserTypeModel.findOne({ email });

    if (!user) {
        throw new Error("User not found");
    }

    let isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid password");
    }

    let token = jwt.sign(
        { userId: user._id },
        process.env.SECRET_KEY,
        { expiresIn: "1d" }
    );

    return { token, user };
}