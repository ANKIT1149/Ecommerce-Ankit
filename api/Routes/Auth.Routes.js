import express from 'express';
import { Google, SignUp, Signin, Signout } from '../controllers/Auth.controllers.js';

const AuthRouter = express.Router();

AuthRouter.post("/signup", SignUp);

AuthRouter.post("/signin", Signin);

AuthRouter.post("/google", Google);

AuthRouter.get("/signout", Signout)
export default AuthRouter;