// import asyncHandler from 'express-async-handler';

import jwt from 'jsonwebtoken';

export const Auth=async(req,res,next)=>{
    try{
        let token;
        let authHeader=req.headers.Authorization || req.headers.authorization;
        if(authHeader && authHeader.startsWith("Bearer")){
            token=authHeader.split(" ")[1];
            jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
                if(err){
                    res.status(401).json({error:"User is not authorized"})
                    return;
                }
                console.log(decoded);
                next();
            })
        }
        else{
            res.json("Bearer Token Missing")
        }
    }
    catch(error){
        console.log(error);
    }
}

