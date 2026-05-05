import exp from 'express'
import { UserModel } from '../models/UserModel.js';
import bcrypt from 'bcryptjs'
import { VerifyToken } from '../Middlewares/verifyToken.js';
import {hash,compare} from 'bcryptjs'
import jwt from 'jsonwebtoken'
const {sign}=jwt;

export const userApp=exp.Router()

//route for registration
userApp.post("/users",async(req,res)=>{
  let allowedRoles=["USER","ADMIN"]
    const newuser=req.body
    //check role
if(!allowedRoles.includes(newuser.role))
{
  return res.status(400).json({message:"invalid role"})
}//run validators maulallly
    newuser.password=await hash(newuser.password,12)
    const  newUserDoc=new UserModel(newuser)
    await newUserDoc.save()
res.status(200).json({message:"user created"})
})

//get details 
userApp.get("/profile" , VerifyToken("USER" , "ADMIN"), async(req , res)=> {
  const user = await UserModel.findById(req.user.id).select("-password");
  if(!user) return res.status(404).json({message: "User not found"});
  res.status(200).json({message: "User Profile", payload: user})
});

//update the budget
userApp.patch("/budget" , VerifyToken("USER") , async(req , res)=> {
  const {monthlyBudget} = req.body;

  const updatedUser = await UserModel.findByIdAndUpdate(
    req.user.id,
    { monthlyBudget },
    { new: true , runValidators: true }
  ).select("-password");
  res.status(200).json({message: "Budget Updated" , payload: updatedUser});
});