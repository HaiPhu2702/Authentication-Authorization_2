"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_middlleware_1 = __importDefault(require("../middleware/auth.middlleware"));
const user_model_1 = require("../schema/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const product_model_1 = require("../schema/product.model");
router.use('/product', auth_middlleware_1.default);
router.post("/user/register", async (req, res) => {
    try {
        const user = await user_model_1.User.findOne({ username: req.body.username });
        if (!user) {
            const hashed = await bcrypt_1.default.hash(req.body.password, 10);
            let newUser = new user_model_1.User({
                username: req.body.username,
                password: hashed
            });
            await newUser.save();
            return res.json({ user: newUser });
        }
        else {
            return res.json({ err: "User already registered" });
        }
    }
    catch (e) {
        return res.json({ message: e.message });
    }
});
router.post("/user/login", async (req, res) => {
    try {
        const user = await user_model_1.User.findOne({ username: req.body.username });
        if (!user) {
            res.json({ err: "User not found" });
        }
        else {
            const compare = bcrypt_1.default.compare(req.body.password, user.password);
            if (!compare) {
                return Promise.reject({
                    code: 404,
                    message: "PASSWORD_NOT_VALID",
                });
            }
            else {
                let payload = {
                    user_id: user.id,
                    username: user.username
                };
                const token = jsonwebtoken_1.default.sign(payload, "123456789", { expiresIn: 36000 });
                return res.json({ token: token, code: 200 });
            }
        }
    }
    catch (e) {
        res.json({ e: e.message });
    }
});
router.post('/product/create', async (req, res) => {
    try {
        const product = await product_model_1.Product.findOne({ name: req.body.name });
        if (product) {
            return res.json({ message: "product already exists" });
        }
        const newProduct = new product_model_1.Product({
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        });
        await newProduct.save();
        return res.json({ product: newProduct });
    }
    catch (e) {
        res.json({ e: e.message });
    }
});
exports.default = router;
//# sourceMappingURL=auth.router.js.map