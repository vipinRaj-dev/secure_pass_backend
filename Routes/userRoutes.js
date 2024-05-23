import express from "express";

import { tokenVerify } from "../middleware/tokenVerify.js";
import {
  addWebsite,
  deletePassword,
  passwordList,
} from "../controllers/userControllers.js";

const userRoutes = express.Router();

userRoutes.post("/addWebsite", tokenVerify, addWebsite);
userRoutes.get("/passwordList", tokenVerify, passwordList);
userRoutes.delete("/deletePassword/:id", tokenVerify, deletePassword);

export default userRoutes;
