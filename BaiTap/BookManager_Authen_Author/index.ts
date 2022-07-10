import express from 'express';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import loginRoutes from "./src/routes/auth.router"

const port = 3000;

const app = express();

mongoose.connect('mongodb://localhost:27017/JWT4')
    .then(() => {
        console.log("connect success")
    })
    .catch((error) => {
        throw error
    })
app.set('view engine', 'ejs');
app.set('views','./src/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: 'keyboard cat',
    resave: true, saveUninitialized: true,
    cookie: {secure: true, maxAge: 60 * 60 * 1000}
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', loginRoutes)

app.listen(port, () => {
    console.log('http://localhost:' + port)
})