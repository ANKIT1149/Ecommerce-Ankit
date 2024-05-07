import express from "express";
import { Updateuser, deleteUser, getProduct, test } from "../controllers/User.controllers.js";
import { VerifyToken } from "../utils/VerifyToken.js";

const UserRouter = express.Router();

UserRouter.get("/test", test);

UserRouter.post('/update/:id', VerifyToken, Updateuser);

UserRouter.delete('/delete/:id', VerifyToken, deleteUser);

UserRouter.get('/products/:id', VerifyToken, getProduct)

export default UserRouter;