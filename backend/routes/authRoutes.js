import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import Joi from "joi";
import User from "../models/User.js";
import "../config/db.js";
dotenv.config();
// import {validateEmail, validatePassword} from '../../frontend/src/utilities/validateUtils.js'

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

  // const emailErrors = validateEmail(req.body.email);
  // const passwordErrors = validatePassword(req.body.passWord);

  // if (emailErrors.length > 0 || passwordErrors.length > 0) {
  //   return res.status(400).json({ error: [...emailErrors, ...passwordErrors].join(", ") });
  // }

  try {
    const hashedPassword = await bcrypt.hash(req.body.passWord, 10);
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      passWord: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "Användaren sparades i databasen" });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.email) {
      return res
        .status(400)
        .json({ error: "E-postadressen är redan registrerad." });
    }

    res.status(500).json({ error: "Gick ej att spara användaren i databasen" });
  }
});

export default router;
