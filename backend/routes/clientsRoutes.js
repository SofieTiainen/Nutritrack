import express from "express";
import Client from "../models/Client.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import "../config/db.js";

const router = express.Router();

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

router.post("/clients", authenticateToken, async (req, res) => {
  const { firstName, lastName, email, gender, ageYears, ageMonths } = req.body;

  if (!firstName || !lastName || !email || !gender) {
    return res
      .status(400)
      .json({ error: "First name, last name, email and gender are required" });
  }
  if ((ageYears === undefined || ageYears === null) && (ageMonths === undefined || ageMonths === null)) {
    return res.status(400).json({ error: 'Either age in years or age in months are required' });
  }

  if ((ageYears !== undefined && ageYears !== null) && (ageMonths !== undefined && ageMonths !== null)) {
    return res.status(400).json({ error: 'You can only provide age in years or age in months, not both' });
  }

  if (ageYears !== undefined && ageYears !== null && (ageYears < 0 || ageYears > 110)) {
    return res.status(400).json({ error: 'Age in years must be between 0 and 110' });
  }

  if (ageMonths !== undefined && ageMonths !== null && (ageMonths < 0 || ageMonths > 11)) {
    return res.status(400).json({ error: 'Age in months must be between 0 and 11' });
  }

  try {
    const newClient = new Client({
      firstName,
      lastName,
      email,
      gender,
      ageYears: ageYears || null,
      ageMonths: ageMonths || null,
      userId: req.user.userId,
    });

    await newClient.save();
    res.status(201).json(newClient);
  } catch (error) {
    console.error("Error saving client:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/clients", authenticateToken, async (req, res) => {
  try {
    const clients = await Client.find({ userId: req.user.userId });
    res.status(200).json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
