import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import Joi from "joi";
import User from "../models/User.js";
import "../config/db.js";
dotenv.config();
const router = express.Router();

const registerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required(),
  passWord: Joi.string().required(),
});

router.post("/register", async (req, res) => {
  const { error, value } = registerSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.passWord, 10);
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      passWord: hashedPassword,
    });

    await newUser.save();
    console.log("Användaren sparades i databasen");
    res.status(201).json({ message: "Användaren sparades i databasen" });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.email) {
      return res
        .status(400)
        .json({ error: "E-postadressen är redan registrerad." });
    }
    console.error("Gick ej att spara användaren i databasen", error);
    res.status(500).json({ error: "Gick ej att spara användaren i databasen" });
  }
});

export default router;
