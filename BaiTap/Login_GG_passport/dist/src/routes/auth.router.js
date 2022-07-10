"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const multer_1 = __importDefault(require("multer"));
const authGG_middleware_1 = __importDefault(require("../middleware/authGG.middleware"));
const upload = (0, multer_1.default)();
router.get('/user/login', upload.none(), async (req, res, next) => {
    res.render('login');
    next();
});
router.get('/auth/google', authGG_middleware_1.default.authenticate('google', { scope: ['profile'] }));
router.get('/auth/google/callback', authGG_middleware_1.default.authenticate('google', { failureRedirect: '/user/login' }), function (req, res) {
    res.send('thanh cong vao roi');
});
exports.default = router;
//# sourceMappingURL=auth.router.js.map