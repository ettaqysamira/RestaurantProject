
const express = require("express");
const cors = require("cors");
const { connectDB, PORT } = require("./config.js");
const authRoutes = require("./authRoutes.js");

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);

app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
