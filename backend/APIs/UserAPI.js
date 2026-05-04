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