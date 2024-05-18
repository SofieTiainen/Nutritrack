import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import authLoginRoutes from "./routes/authLogin.js";
import clientRoutes from "./routes/clientsRoutes.js";
import apiRoutes from './routes/apiRoutes.js'
import "./config/db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Välkommen till backend-applikationen");
});

app.use("/api/auth", authRoutes);
app.use("/api/auth", authLoginRoutes);
app.use("/api", clientRoutes);
app.use('/food', apiRoutes)

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
