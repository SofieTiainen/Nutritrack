import express from "express";
import FoodDiary from "../models/FoodDiary.js";
import Client from "../models/Client.js";
import NutritionAnalysis from "../models/NutritionAnalysis.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import "../config/db.js";
const router = express.Router();
//Lägg till detta senare
// import authenticateToken from "../middleware/authenticateToken.js";

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

router.post("/nutritionanalysis", authenticateToken, async (req, res) => {
  const { clientId, days } = req.body;

  try {
    const newNutritionAnalysis = new NutritionAnalysis({ clientId, days });
    await newNutritionAnalysis.save();
    
    res.status(201).json(newNutritionAnalysis);
  } catch (error) {
    console.error('Error saving nutrition analysis:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;