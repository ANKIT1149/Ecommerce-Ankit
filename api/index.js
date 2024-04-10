import { error } from "console";
import express from "express";
import mongoose from "mongoose"
const app = express();

app.listen(4000, (req, res) => {
     console.log("Server is running on port 4000")
})

mongoose.connect("mongodb+srv://Aryanshraj:Aryansh4567@mern-ecom.9l7jjxs.mongodb.net/?retryWrites=true&w=majority&appName=mern-ecom").then(() => {
     console.log("Connect to mongoDB");
}).catch((error) => {
     console.log("not connected", error)
})