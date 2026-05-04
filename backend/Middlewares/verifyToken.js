import { config } from 'dotenv';
import jwt from'jsonwebtoken'
const {verify}=jwt
config();
export const   VerifyToken=(...allowedRoles)=>{

return (req,res,next)=>{
   try{
    const token=req.cookies?.token;
   if(!token){
    return res.status(401).json({message:"plz login first"})
   }
  
   let deocodedtoken =verify(token,process.env.SECRET_KEY);
   //check the role is same as in deoocded token 
if(!allowedRoles.includes(deocodedtoken.role)){
    return res.status(403).json({message:"you are not authorized"})
}
   //console.log( deocodedtoken);
   req.user=deocodedtoken
   next();
   }
catch(err){
res.status(401).json({message:"invalid token"})
}}}