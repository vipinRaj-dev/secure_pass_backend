import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRouter from "./Routes/authRoutes.js";
import userRoutes from "./Routes/userRoutes.js";

const app = express();

// app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(
  cors({
    origin: ["http://54.160.159.152:3000", "http://localhost:3000" , "https://passwordgenerator-frontend.vercel.app"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
dotenv.config();

app.get("/working", async (req, res) => {
  res.send("Backed code working properly");
});

const mongoUri = process.env.MONGO_URI;

const port = process.env.PORT;

app.get("/working", async (req, res) => {
  console.log("working");
  res.send("Backed code working properly");
});

app.use("/auth", authRouter);
app.use("/user", userRoutes);

if (port && mongoUri) {
  mongoose
    .connect(mongoUri)
    .then(() => {
      console.log("Database connected succesfully");

      app.listen(port, () => console.log(`server Listening on port ${port}`));
    })
    .catch((error) => {
      console.log("cannot conncect to the database", error);
      process.exit(1);
    });
}
