const express = require("express");
const adminMiddleware = require("./authMiddleware");
const router = express.Router();

router.get("/admin/dashboard", adminMiddleware, (req, res) => {
  res.send("Bienvenue sur le dashboard de l'administrateur");
});

module.exports = router;
