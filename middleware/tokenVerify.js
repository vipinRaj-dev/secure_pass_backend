import express from "express";
import jwt from "jsonwebtoken";

export const tokenVerify = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ error: "Access denied" });
    }
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Access denied" });
    }

    const decoded = jwt.verify(token, "secretkey");

    req.user = decoded;
    next();
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
 