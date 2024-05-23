import { UserModel } from "../models/UserModel.js";


export const addWebsite = async (req, res) => {
  try {
    const { password, website } = req.body;

    if (!password || !website) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await UserModel.findById(req.user.id);

    if (!user) {
      return res.status(400).json({ error: "User does not exists" });
    }

    user.passwordList.push({ password, website });

    await user.save();

    res.status(200).json({ message: "Website added successfully" });

    console.log("Website added successfully");
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const passwordList = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);

    if (!user) {
      return res.status(400).json({ error: "User does not exists" });
    }

    res.status(200).json({ passwordList: user.passwordList });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deletePassword = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);

    if (!user) {
      return res.status(400).json({ error: "User does not exists" });
    }

    user.passwordList = user.passwordList.filter(
      (item) => item._id != req.params.id
    );

    await user.save();
    res.status(200).json({ success: "success" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
