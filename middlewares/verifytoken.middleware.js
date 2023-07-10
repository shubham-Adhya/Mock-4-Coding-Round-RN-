const jwt= require("jsonwebtoken");
require("dotenv").config();

async function verifyToken(req,res,next){
    const token=req.headers.authorization
    if(token){
        jwt.verify(token, process.env.JWT_secret,(err,decoded)=>{
            if(err) throw err
            
            req.userData=decoded
            next()
        })
    }else{
        return res.status(403).json({message: "Token not provided"})
    }
}

module.exports={verifyToken}