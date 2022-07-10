import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import {User} from "../schema/user.model";

export default async function Authentication(req,res,next) {
    try {
        const user = await User.findOne({username: req.body.username});
        if (!user){
          return   res.json({message: "user not found"})
        }else {
            //so sanh pass hash
            let compare=bcrypt.compare(user.password,req.body.password);
            if(!compare){
                return  res.json({message: "Wrong password"})
            }else {
                //tao payloadd+tao token
                let payload = {
                    user_id:user.id,
                    username:user.username
                }
                let token=jwt.sign(payload,"123456789",{expires:3600})
                res.json({token:token})
                next();
            }
        }
    }catch (e) {
        return res.json({e:e.message});
    }
}