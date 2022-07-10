import express from "express";

const router = express.Router();
import bcrypt from "bcrypt"
import authMiddleware from "../middleware/auth.middlleware"
import {User} from "../schema/user.model";
import jwt from "jsonwebtoken"
import {Product} from "../schema/product.model";

router.use('/product', authMiddleware)

router.post("/user/register", async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if (!user) {
            const hashed = await bcrypt.hash(req.body.password,10);
            let newUser = new User({
                username: req.body.username,
                password: hashed
            })
            await newUser.save();
            return  res.json({user:newUser})
        } else {
            return  res.json({err: "User already registered"})
        }
    } catch (e) {
        return  res.json({message: e.message});
    }
})

router.post("/user/login", async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username})
        if (!user) {
            res.json({err: "User not found"})
        } else {
            //so sanh mat khau
            const compare = bcrypt.compare(req.body.password, user.password)
            if (!compare) {
                // res.json({err:"Password incorrect"})
                return Promise.reject({
                    code: 404,
                    message: "PASSWORD_NOT_VALID"
                });
            } else {
                let payload = {
                    user_id: user.id,
                    username: user.username
                }
                const token = jwt.sign(payload, "123456789", {expiresIn: 36000})
                return res.json({token: token, code: 200})
            }
        }
    } catch (e) {
        res.json({e: e.message})
    }
})

router.post('/product/create',async (req, res) => {
    try {
        const product = await Product.findOne({name:req.body.name})
        if(product){{}
            return res.json({message:"product already exists"})
        }
        const newProduct = new Product({
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        })
        await newProduct.save()
        return res.json({product: newProduct})
    }catch (e) {
        res.json({e: e.message})
    }
})
export default router