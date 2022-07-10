
import jwt from "jsonwebtoken"

export default async function auth(req,res,next) {
    try {
        let accessToken = req.body.access_token;
        // or no  nam trong header
        // token= req.headers.authorization
        //access_token.split('.').[0]
        if (accessToken){
            jwt.verify(accessToken,'123456789',(err,decoded) => {
                if(err){
                    res.status(401).json({
                        message:err.message,
                        status:401
                    })
                }else {
                    req.decoded=decoded
                        next()
                }

            })
        }else{
              res.status(401).json({
            message:'No token provided',
            status:401
        })
        }
    }catch (e) {
        res.status(401).json({
            message:e.message,
            status:401
        })
    }

}