
import jwt from "jsonwebtoken"

export default async function Auth(req,res,next) {
    try {
        let accessToken=req.body.access_token;
        if(accessToken){
            //tien hanh giai ma
            jwt.verify(accessToken,"123456789",(err,decoded)=>{
                if(err){
                    return res.json({message:err.message})
                }else {
                    req.decoded=decoded
                    next()
                }
            })
        }else {
            return  res.json({message:"no access token"})
        }

    }catch (e) {
        return res.json({e:e.message});
    }

}