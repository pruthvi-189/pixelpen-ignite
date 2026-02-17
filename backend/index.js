import dotenv from "dotenv";
dotenv.config(); // MUST be first

import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debug route
app.post("/debug", (req, res) => {
  res.json({ message: "Debug route works" });
});

// Auth routes
app.use("/api/auth", authRoutes);

// Base route
app.get("/", (req, res) => {
  res.send("PixelPen Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
