import express from "express";
import FoodDiary from "../models/FoodDiary.js";
import Client from "../models/Client.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import "../config/db.js";
//Lägg till detta senare
// import authenticateToken from "../middleware/authenticateToken.js";

const router = express.Router();

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401);
  
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
};


router.post('/foodDiary', authenticateToken, async (req, res) => {
    const { clientId, days } = req.body;
  
    try {
      const client = await Client.findById(clientId);
      if (!client) {
        return res.status(404).json({ error: 'Client not found' });
      }
  
      const newFoodDiary = new FoodDiary({
        clientId,
        days
      });
  
      await newFoodDiary.save();
      res.status(201).json(newFoodDiary);
    } catch (error) {
      console.error('Error saving food diary:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/foodDiary/:diaryId', authenticateToken, async (req, res) => {
  const { diaryId } = req.params;
  const { clientId, days } = req.body;

  try {
    const foodDiary = await FoodDiary.findById(diaryId);
    if (!foodDiary) {
      return res.status(404).json({ error: 'Food diary not found' });
    }

    foodDiary.clientId = clientId;
    foodDiary.days = days;

    await foodDiary.save();
    res.status(200).json(foodDiary);
  } catch (error) {
    console.error('Error updating food diary:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/foodDiary/:clientId', authenticateToken, async (req, res) => {
    try {
      const foodDiaries = await FoodDiary.find({ clientId: req.params.clientId });
      res.status(200).json(foodDiaries);
    } catch (error) {
      console.error('Error fetching food diaries:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/foodDiary/:clientId/:diaryId', authenticateToken, async (req, res) => {
  try {
    const foodDiary = await FoodDiary.findOne({ _id: req.params.diaryId, clientId: req.params.clientId });
    if (!foodDiary) {
      return res.status(404).json({ error: 'Food diary not found' });
    }
    res.status(200).json(foodDiary);
  } catch (error) {
    console.error('Error fetching food diary:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/foodDiaries', authenticateToken, async (req, res) => {
  try {
    const clients = await Client.find({ userId: req.user.userId });
    const clientIds = clients.map(client => client._id);

    const foodDiaries = await FoodDiary.find({ clientId: { $in: clientIds } }).populate('clientId', 'firstName lastName');

    res.status(200).json(foodDiaries);
  } catch (error) {
    console.error('Error fetching food diaries:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/foodDiary/:diaryId', authenticateToken, async (req, res) => {
  try {
    const {diaryId} = req.params;
    const foodDiary = await FoodDiary.findById(diaryId);

    if(!foodDiary) {
      return res.status(404).json({error: 'FoodDiary not found'});
    }

    await FoodDiary.findByIdAndDelete(diaryId);
    res.status(200).json({ message: 'Food diary deleted successfully' });
  } catch (error) {
    console.error('Error deleting food diary:', error);
    res.status(500).json({ error: 'Internal server error' });
  }


})


export default router;

