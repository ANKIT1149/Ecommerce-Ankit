import User from "../Modules/User.module.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/Error.js";
import jwt from "jsonwebtoken";

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

export const Signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validateUser = await User.findOne({ email });
    if (!validateUser) return next(errorHandler(404, "Wrong Email Address"));
    const validatePAssword = bcryptjs.compareSync(
      password,
      validateUser.password
    );
    if (!validatePAssword) return next(errorHandler(401, "Invalid Credential"));
    const token = jwt.sign({ id: validateUser._id }, process.env.SECRET_CODE);
    const { password: pass, ...rest } = validateUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const Google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.SECRET_CODE);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).split(-8) +
        Math.random().toString(36).split(-8);

      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const generatedPhone =
        Math.random().toString(36).split(-4) +
        Math.random().toString(36).split(-4);

      const hashedPhone = bcryptjs.hashSync(generatedPhone, 10);

      const generatedAge =
        Math.random().toString(8).split(-2) +
        Math.random().toString(8).split(-2);

      const hashedAge = bcryptjs.hashSync(generatedAge, 8);

      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).split(-4),
        email: req.body.email,
        password: hashedPassword,
        phone: hashedPhone,
        age: hashedAge,
      });

      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.SECRET_CODE);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
