import { error } from "console";
import express from "express";
import mongoose from "mongoose"
import UserRouter from "./Routes/User.Routes.js";
import AuthRouter from "./Routes/Auth.Routes.js";
import cookieParser from 'cookie-parser'
import dotenv from "dotenv";
import ListeningRouter from "./Routes/Listening.routes.js";

const app = express();
dotenv.config()

app.listen(4000, (req, res) => {
     console.log("Server is running on port 4000")
})

mongoose.connect("mongodb+srv://Aryanshraj:Aryansh4567@mern-ecom.9l7jjxs.mongodb.net/?retryWrites=true&w=majority&appName=mern-ecom").then(() => {
     console.log("Connect to mongoDB");
}).catch((error) => {
     console.log("not connected", error)
})

app.use(express.json());
app.use(cookieParser())

app.use("/api/user", UserRouter);
app.use("/api/auth", AuthRouter);
app.use('/api/listening', ListeningRouter);

app.use((err, req, res, next) => {
     const statusCode = err.statusCode || 500;
     const message = err.message || 'Internal Server Error';
     return res.status(statusCode).json({
           success: false,
           message,
           statusCode

     })
})