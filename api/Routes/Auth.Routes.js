import express from 'express';
import { SignUp } from '../controllers/Auth.controllers.js';

const AuthRouter = express.Router();

AuthRouter.post("/signup", SignUp);

export default AuthRouter;