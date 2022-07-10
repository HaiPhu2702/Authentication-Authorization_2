"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function auth(req, res, next) {
    try {
        let accessToken = req.body.access_token;
        if (accessToken) {
            jsonwebtoken_1.default.verify(accessToken, '123456789', (err, decoded) => {
                if (err) {
                    res.status(401).json({
                        message: err.message,
                        status: 401
                    });
                }
                else {
                    req.decoded = decoded;
                }
            });
        }
        else {
            res.status(401).json({
                message: 'No token provided',
                status: 401
            });
        }
    }
    catch (e) {
        res.status(401).json({
            message: e.message,
            status: 401
        });
    }
    next();
}
exports.default = auth;
//# sourceMappingURL=auth.middlleware.js.map