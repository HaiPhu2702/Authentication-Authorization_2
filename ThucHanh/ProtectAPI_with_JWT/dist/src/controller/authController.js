"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../schema/user.model");
const checkLogin_1 = __importDefault(require("../middleware/checkLogin"));
class AuthController {
    static login(req, res) {
        res.render('./Auth/login');
    }
    static async postLogin(req, res, next) {
        console.log(1);
        await checkLogin_1.default.authenticate('local', (err, user) => {
            if (err) {
                res.end("sai pass");
            }
            else {
                console.log(user);
            }
        })(req, res, next);
    }
    static register(req, res) {
        res.render('./Auth/register');
    }
    static async postRegister(req, res) {
        try {
            const salt = await bcrypt_1.default.genSaltSync(10);
            const hash = await bcrypt_1.default.hashSync(req.body.password, salt);
            const newUser = new user_model_1.User({
                username: req.body.username,
                password: hash
            });
            await newUser.save();
            res.status(200).json(newUser);
        }
        catch (e) {
            res.status(500).json(e);
        }
    }
}
exports.default = AuthController;
//# sourceMappingURL=authController.js.map