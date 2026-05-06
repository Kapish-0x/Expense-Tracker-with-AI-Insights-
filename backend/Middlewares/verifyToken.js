// import { config } from 'dotenv';
// import jwt from'jsonwebtoken'
// const {verify}=jwt
// config();

// export const VerifyToken = (...allowedRoles) => {
//   return (req, res, next) => {
//     try {
      
//       let token = req.cookies?.token;

//       if (!token && req.headers.authorization) {
//         token = req.headers.authorization.split(' ')[1];
//       }

//       if (!token) {
//         return res.status(401).json({ message: "please login first" });
//       }

//       let decodedToken = verify(token, process.env.SECRET_KEY);

//       // Check role
//       if (allowedRoles.length > 0 && !allowedRoles.includes(decodedToken.role)) {
//         return res.status(403).json({ message: "you are not authorized" });
//       }

//       req.user = decodedToken;
//       next(); 
//     } catch (err) {
//       res.status(401).json({ message: "invalid token" });
//     }
//   };
// };






import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { UserModel } from '../models/UserModel.js'; // Model import karna zaroori hai

const { verify } = jwt;
config();

export const VerifyToken = (...allowedRoles) => {
  return async (req, res, next) => { // async banaya taaki DB query kar sakein
    try {
      let token = req.cookies?.token;

      if (!token && req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1];
      }

      if (!token) {
        return res.status(401).json({ message: "Please login first" });
      }

      // 1. Token decode karo
      let decodedToken = verify(token, process.env.SECRET_KEY);

      // 2. FRESH DATA FETCH KARO (Database se)
      // Token mein sirf ID hoti hai, income/expense DB mein hote hain
      const freshUser = await UserModel.findById(decodedToken.id).select("-password");

      if (!freshUser) {
        return res.status(404).json({ message: "User no longer exists" });
      }

      // 3. Role Check (decodedToken ya freshUser dono se kar sakte ho)
      if (allowedRoles.length > 0 && !allowedRoles.includes(freshUser.role)) {
        return res.status(403).json({ message: "You are not authorized" });
      }

      // 4. Sabse Important Step: Fresh data req object mein daal do
      req.user = freshUser; 
      
      next();
    } catch (err) {
      console.error("Auth Middleware Error:", err.message);
      res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};