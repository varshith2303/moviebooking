const jwt=require('jsonwebtoken')
require('dotenv').config()

const verifyToken=(req,res,next)=>{

    const bearerToken=req.headers.authorization;
    
    if(!bearerToken){
        return res.status(401).json({ message: "Unauthorized! Please login to continue." });
    }
    else{
      const token=bearerToken.split(' ')[1]
        try{
            const verify=jwt.verify(token,process.env.SECRET_KEY)
            req.user=verify;
            
            next()
        }
        catch(err){
            
            return res.status(401).json({ message: "Invalid or expired token", error: err.message });
        }
    }


}


module.exports=verifyToken;
