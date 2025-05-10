const jwt=require('jsonwebtoken')
require('dotenv').config()

const verifyToken=(req,res,next)=>{

    const bearerToken=req.headers.authorization;
    
    if(!bearerToken){
        res.send({message:"Unauthorized Access! PLease login to continue"})
    }
    else{
      const token=bearerToken.split(' ')[1]
        try{
            const verify=jwt.verify(token,process.env.SECRET_KEY)
            req.user=verify
            next()
        }
        catch(err){
            
            next(err);
        }
    }


}


module.exports=verifyToken;
