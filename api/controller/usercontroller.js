import User from "../model/Usermodel.js";
import jwt from "jsonwebtoken";
import bcycpt from "bcrypt";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      const match = await bcycpt.compare(password, user.password);
      if (match) {
        const accessToken = jwt.sign(
          { email: user._id },
          process.env.JWT_SECRET,
          { expiresIn: "1m" }
        );
        res.json({ user, accessToken });
      } else {
        return res.json({ error: "Invalid Crediantials" });
      }
    } else {
      return res.json({ error: "User is not registered" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { name, password, email } = req.body;
    const duplicate = await User.findOne({ email });
    if (duplicate) {
      return res.json({ error: "User already exists" });
    } else {
      const hashedPass = await bcycpt.hash(password, 10);
      const user = await User.create({
        name,
        email,
        password: hashedPass,
      });
      const accessToken = jwt.sign(
        { email: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1m" }
      );

      res.status(200).json({ user, accessToken });
    }
  } catch (error) {
    console.log("Error", error);
  }
};

export const allusers = async (req, res, next) => {
  try {
    const search = await User.find();
    res.json(search);
  } catch (error) {
    console.log(error);
  }
};

export const test = (req, res) => {
  try {
    res.json("Tested");
  } catch (error) {
    console.log(error);
  }
};
