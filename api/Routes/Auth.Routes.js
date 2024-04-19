import express from 'express';
import { Google, SignUp, Signin } from '../controllers/Auth.controllers.js';

const AuthRouter = express.Router();

AuthRouter.post("/signup", SignUp);

AuthRouter.post("/signin", Signin);

AuthRouter.post("/google", Google);
export default AuthRouter;