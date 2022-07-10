"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../schema/user.model");
const product_model_1 = require("../schema/product.model");
const auth_middlleware_1 = __importDefault(require("../middleware/auth.middlleware"));
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
router.use('/product', auth_middlleware_1.default);
router.get('/user/login', async (req, res) => {
    res.render('login');
});
router.post("/user/login", upload.none(), async (req, res) => {
    try {
        const user = await user_model_1.User.findOne({ username: req.body.username });
        if (user) {
            const comparePass = await bcrypt_1.default.compare(req.body.password, user.password);
            if (!comparePass) {
                return Promise.reject({ code: 404, message: "PASSWORD_NOT_VALID", });
            }
            let payload = {
                user_id: user.id,
                username: user.username,
                role: user.role
            };
            const token = jsonwebtoken_1.default.sign(payload, '123456789', { expiresIn: 36000, });
            res.render("home", { token: token });
        }
        else {
            return res.json({ err: 'Sai tài khoản hặc mật khẩu' });
        }
    }
    catch (err) {
        return res.json({ err: err });
    }
});
router.post('/home', async (req, res) => {
    res.render("home");
});
router.get("/list", async (req, res) => {
    const products = await product_model_1.Product.find();
    res.render("list", { products: products });
});
router.get("/create", async (req, res) => {
    res.render("create");
});
router.post("/user/register", async (req, res) => {
    try {
        const user = await user_model_1.User.findOne({ username: req.body.username });
        if (!user) {
            const passwordHash = await bcrypt_1.default.hash(req.body.password, 10);
            let userData = { username: req.body.username, role: req.body.role, password: passwordHash };
            const newUser = await user_model_1.User.create(userData);
            res.json({ user: newUser, code: 200 });
        }
        else {
            res.json({ err: "User exited" });
        }
    }
    catch (err) {
        res.json({ err: err });
    }
});
router.post("/product/create", async (req, res) => {
    try {
        const user = req.decoded;
        if (user.role !== "admin") {
            res.render("error");
            return;
        }
        else {
            const product = await product_model_1.Product.findOne({ name: req.body.name });
            if (!product) {
                let productData = { name: req.body.name, price: req.body.price, category: req.body.category, };
                const productNew = await product_model_1.Product.create(productData);
                res.render("success");
            }
            else {
                res.json({ err: "Product exited" });
            }
        }
    }
    catch (err) {
        res.json({ err: err });
    }
});
exports.default = router;
//# sourceMappingURL=auth.router.js.map