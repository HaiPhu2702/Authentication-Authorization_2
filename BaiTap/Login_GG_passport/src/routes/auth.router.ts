import express from "express";

const router = express.Router();

import jwt from 'jsonwebtoken';

import bcrypt from 'bcrypt';

import {User} from "../schema/user.model"

import {Product} from '../schema/product.model';

import Auth from '../middleware/authJWT.middlleware'

import multer from 'multer';
import passport from '../middleware/authGG.middleware'

const upload = multer()

// router.use('/product', Auth)

router.get('/user/login', upload.none(),async (req, res,next) => {
    res.render('login')
    next();
})

// router.post("/user/login", upload.none(), async (req, res) => {
//     try {
//         const user = await User.findOne({username: req.body.username});
//         if (user) {
//             const comparePass = await bcrypt.compare(req.body.password, user.password);
//             if (!comparePass) {
//                 return Promise.reject({code: 404, message: "PASSWORD_NOT_VALID",});
//             }
//             let payload = {
//                 user_id: user.id,
//                 username: user.username,
//                 role: user.role
//             }
//             const token = jwt.sign(payload, '123456789', {expiresIn: 36000,});
//             res.render("home", {token: token});
//         } else {
//             return res.json({err: 'Sai tài khoản hặc mật khẩu'});
//         }
//     } catch (err) {
//         return res.json({err: err})
//     }
// });

// router.post('/home', async (req, res) => {
//     res.render("home")
// })
//
// router.get("/list", async (req, res) => {
//     const products = await Product.find();
//     res.render("list", {products: products});
// })
//
// router.get("/create", async (req, res) => {
//     res.render("create");
// })
//
// router.post("/user/register", async (req, res) => {
//     try {
//         const user = await User.findOne({username: req.body.username});
//         if (!user) {
//             const passwordHash = await bcrypt.hash(req.body.password, 10);
//             let userData = {username: req.body.username, role: req.body.role, password: passwordHash}
//             const newUser = await User.create(userData);
//             res.json({user: newUser, code: 200})
//         } else {
//             res.json({err: "User exited"})
//         }
//     } catch (err) {
//         res.json({err: err})
//     }
// });
//
// router.post("/product/create", async (req: any, res) => {
//     try {
//         const user = req.decoded;
//         if (user.role !== "admin") {
//             res.render("error");
//             return;
//         }else
//         {
//             const product = await Product.findOne({name: req.body.name});
//             if (!product) {
//                 let productData = {name: req.body.name, price: req.body.price, category: req.body.category,}
//                 const productNew = await Product.create(productData);
//                 res.render("success")
//             } else {
//                 res.json({err: "Product exited"})
//             }
//         }
//     } catch (err) {
//         res.json({err: err})
//     }
// });

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/user/login'}),
  function(req, res) {
    // Successful authentication, redirect home.
    res.send('thanh cong vao roi');
  });




export default router






























