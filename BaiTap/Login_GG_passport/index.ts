import express from 'express';
import bodyParser from "body-parser";
import dotevn from 'dotenv';
import  mongoose from "mongoose";
import router from "./src/routes/auth.router"
import corx from "cors"
import passport from "passport"
import cookieParser from "cookie-parser"
import session from "express-session"


const port =3000

dotevn.config()
const app = express();

app.set('view engine', 'ejs');
app.set("views",'./src/views')

mongoose.connect(process.env.MONGODB_URL,()=>{
    console.log("connect success")
})

app.use(corx())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(session({
    secret: 'keyboard cat',
    resave: true, saveUninitialized: true,
    cookie: {secure: true, maxAge: 60 * 60 * 1000}
}));
app.use(cookieParser())
app.use(passport.initialize());
app.use(passport.session());



app.use("/", router);


app.listen(port,()=>{
    console.log("http://localhost:"+port)
})


