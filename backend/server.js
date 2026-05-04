import exp from "express";
import { connect } from "mongoose";
import bcrypt from 'bcryptjs';
import {config} from 'dotenv'
import { commonApp } from "./APIs/CommonAPI.js";

config();           //process.env.PORT , process.env.PORT

const app=exp()
//add body parser

app.use(exp.json())

app.use("/common-api",commonApp)


//port number
const port=process.env.PORT || 5000

async function connectDB(){
    try{
        await connect(process.env.DB_URL);
        console.log("DB connection succesfull");
        //start server
        app.listen(port,()=>console.log(`Server on port ${port}`))
    }
    catch(err){
        console.log("Error in db connection :",err);
    }
}

connectDB();



//error handling middleware(must be present at the end of the file only) - only exectes when error is occured
app.use((err,req,res,next)=>{
    console.log(err.name)
    //validation error
    if(err.name==='ValidationError'){
        return res.status(400).json({message:"Error",error:err.message})
    }
    //cast error
    if(err.name==='CastError'){
        return res.status(400).json({message:"Error",error:err.message})
    }

    //send server side errors
    res.status(500).json({message:"Error from server side",error:err.message})
})