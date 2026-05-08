import exp from 'express'
import { UserModel } from '../models/UserModel.js';
import bcrypt from 'bcryptjs'
import { VerifyToken } from '../Middlewares/verifyToken.js';
import {hash,compare} from 'bcryptjs'
import jwt from 'jsonwebtoken'
const {sign}=jwt;

export const commonApp=exp.Router()

//Route for Login
commonApp.post("/login", async (req, res) => {
  //console.log(req.body)
  //get user cred obj
  const { email, password } = req.body;
  //find user by email
  const user = await UserModel.findOne({ email: email });
  //if use not found
  if (!user) {
    return res.status(400).json({ message: "Invalid email" });
  }
  //compare password
  const isMatched = await compare(password, user.password);
  //if passwords not matched
  if (!isMatched) {
    return res.status(400).json({ message: "Invalid password" });
  }
  //create jwt
  const signedToken = sign(
    {
      id: user._id,
      email: email,
      role: user.role,
      name:user.name,
      profileImageUrl: user.profileImageUrl,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "1h",
    },
  );

  //set token to res header as httpOnly cookie
  res.cookie("token", signedToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  //remove password from user document
  let userObj = user.toObject();
  delete userObj.password;

  //send res
  res.status(200).json({ message: "login success", payload: userObj });
});



//Route for Logout
commonApp.get("/logout", (req, res) => {
  //delete token from cookie storage
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  //send res
  res.status(200).json({ message: "Logout success" });
});

//change password
commonApp.put("/password" , VerifyToken("USER","ADMIN"), async (req,res) => {
  //check if current password and new password are same
  const {currentPassword , newPassword} = req.body;
  if(currentPassword === newPassword) {
    return res.status(400).json({message: "Both the passwords are same! pls change"});
  }
  //check if current password matches the user password
  const user = await UserModel.findById(req.user.id);
  if(!user) {
    return res.status(404).json({message:"User not found"});
  }
  //check the current password of request and user are not same 
  const isMatched = await compare(currentPassword, user.password);
  if(!isMatched) {
    return res.status(400).json({message:"Current password doesnt match"})
  }
  //hash new password 
  const hashedPassword = await hash(newPassword,12);
  //replace current password of user with hashed new password 
  user.password = hashedPassword;
  //save
  await user.save();
  //send res
  res.status(200).json({message: "Password changed"})
});