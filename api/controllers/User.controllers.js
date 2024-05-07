import Listening from "../Modules/Listening.module.js";
import User from "../Modules/User.module.js";
import { errorHandler } from "../utils/Error.js";
import bcryptjs from "bcryptjs";
export const test = (req, res) => {
  res.json({
    message: "Hello Ecommerce",
  });
};

export const Updateuser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can update your own account"));

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    if (req.body.phone) {
      req.body.phone = bcryptjs.hashSync(req.body.phone, 10);
    }

    const UpdateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          phone: req.body.phone,
          age: req.body.age,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, phone, ...rest } = UpdateUser._doc;

    res.status(201).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can delete your own ccount"));

  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(201).json("User Deleted Successfuuly");
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const product = await Listening.find({ userRef: req.params.id });
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "You can view only your own account"));
  }
};
