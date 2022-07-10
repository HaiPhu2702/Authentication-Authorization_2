import jwt from "jsonwebtoken";

export default async function Authorization(req, res, next) {
    try {
        let access_token = req.body.access_token;
        if (access_token) {
            jwt.verify(access_token, '12345678', function (err, decoded) {
                if (err) {
                    return res.json(err);
                }else {
                    next()
                }
            });
        } else {
            res.json({message: "No access_token"})
        }
    } catch (e) {
        res.json({e: e.message});
    }
}