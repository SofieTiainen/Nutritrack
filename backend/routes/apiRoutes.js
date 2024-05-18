import express from "express";
import axios from 'axios';
const router = express.Router();


router.get('/api-info', async (req, res) => {
    try {
        const response = await axios.get("https://dataportal.livsmedelsverket.se/livsmedel/api/v1/api-info");
        res.json(response.data)

    } catch (error) {
        console.log("Error fetching api-info: ", error);
        res.status(500).json({ error: 'Error fetching api-info' });
    }
})

router.get('/livsmedel', async (req, res) => {
    const {offset = 0, limit = 20, sprak = 1 } = req.query;

    try {
        const response = await axios.get("https://dataportal.livsmedelsverket.se/livsmedel/api/v1/livsmedel", {
            params: {offset, limit, sprak}
        });
        res.json(response.data)

    } catch (error) {
        console.log("Error fetching livsmedel: ", error);
        res.status(500).json({ error: 'Error fetching livsmedel' });
    }
})

router.get('/livsmedel/nummer', async (req, res) => {
    const { number } = req.params;

    try {
        const response = await axios.get(`https://dataportal.livsmedelsverket.se/livsmedel/api/v1/livsmedel/${number}`, {
        });
        res.json(response.data)

    } catch (error) {
        console.log("Error fetching livsmedel: ", error);
        res.status(500).json({ error: 'Error fetching livsmedel' });
    }
})

router.get('/livsmedel/nummer/naringsvarden', async (req, res) => {
    const { number } = req.params;

    try {
        const response = await axios.get(`https://dataportal.livsmedelsverket.se/livsmedel/api/v1/livsmedel/${number}/naringsvarden`, {
        });
        res.json(response.data)

    } catch (error) {
        console.log("Error fetching livsmedel: ", error);
        res.status(500).json({ error: 'Error fetching livsmedel' });
    }
})

export default router;