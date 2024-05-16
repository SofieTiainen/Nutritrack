const router = express.Router();
import express from "express";
import Client from "../models/Client.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import "../config/db.js";

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
  console.log("req", req);
  const { firstName, lastName, email } = req.body;
  console.log("firstname", firstName);

  if (!firstName || !lastName || !email) {
    return res
      .status(400)
      .json({ error: "First name, last name, and email are required" });
  }

  try {
    const newClient = new Client({
      firstName,
      lastName,
      email,
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
