import { errorHandler } from "./Error.js";
import jwt from "jsonwebtoken";

export const VerifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if(!token) return next(errorHandler(401, 'UnAuthorized'))

    jwt.verify(token, process.env.SECRET_CODE, (err, user) => {
         if(err) return next(errorHandler(403, 'Forbidden'));

         req.user = user;

         next()
    })
}