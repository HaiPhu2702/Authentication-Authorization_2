import express from "express";
const router=express.Router();
import Authentication from "../middleware/authen"
import Authorization from "../middleware/authorizatinJWT";


router.use('/product', Authorization)

router.get('/login', async (req, res) => {
    res.render('login')
})

router.post('/login', Authentication,async (req, res,next) => {
    res.render('list')
})








export default router;