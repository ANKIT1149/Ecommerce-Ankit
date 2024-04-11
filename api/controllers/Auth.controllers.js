import User from "../Modules/User.module.js";
import bcryptjs from "bcryptjs";


export const SignUp = async (req, res, next) => {
  const { username, email, password, phone, age } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
//   const hashedPhoneNumber = bcryptjs.hashSync(phone, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    phone,
    age,
  });
  try {
    await newUser.save();
    res.status(201).json("user created successfully");
  } catch (error) {
    next(error);
  }
};
