console.log("AuthRoutes file loaded");

import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/verify", verifyToken, (req, res) => {
  res.json({
    valid: true,
    user: req.user,
  });
});

router.get("/test", (req, res) => {
  res.send("Test route working");
});

export default router;
