"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function Auth(req, res, next) {
    try {
        let accessToken = req.body.access_token;
        if (accessToken) {
            jsonwebtoken_1.default.verify(accessToken, "123456789", (err, decoded) => {
                if (err) {
                    return res.json({ message: err.message });
                }
                else {
                    req.decoded = decoded;
                    next();
                }
            });
        }
        else {
            return res.json({ message: "no access token" });
        }
    }
    catch (e) {
        return res.json({ e: e.message });
    }
}
exports.default = Auth;
//# sourceMappingURL=authJWT.middlleware.js.map