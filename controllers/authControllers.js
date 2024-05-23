import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { UserModel } from "../models/UserModel.js";

export const userRegistration = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({ error: "All fields are required" });
    }

    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // console.log("hashedPassword", hashedPassword);

    const newUser = new UserModel({ email, password: hashedPassword });

    await newUser.save();

    res.status(200).json({ message: "User registered successfully" });

    console.log("User registered successfully");
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(403).json({ error: "All fields are required" });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User does not exists" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, "secretkey");
    res.cookie("jwttoken", token, {
      secure: true,
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ success: "success", token: token });

    console.log("User logged in successfully");
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
