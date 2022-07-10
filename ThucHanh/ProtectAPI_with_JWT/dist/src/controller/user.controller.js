"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserController {
    static pageAdmin(res, req) {
        res.render('./Page/admin');
    }
    static pageUser(req, res) {
        res.render('./Page/user');
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map