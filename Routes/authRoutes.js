import express from "express";
import { userLogin, userRegistration } from "../controllers/authControllers.js";

const authRoutes = express.Router();

authRoutes.post("/signup", userRegistration);
authRoutes.post("/login", userLogin);

// authRoutes.post('/addWebsite' , tokenVerify, addWebsite);
// authRoutes.get("/passwordList", tokenVerify, passwordList);
// authRoutes.delete("/deletePassword/:id", tokenVerify, deletePassword);

export default authRoutes;
