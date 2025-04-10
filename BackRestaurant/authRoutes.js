const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./userModel.js");
const JWT_SECRET = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30";

const router = express.Router();



router.post("/signup", async (req, res) => {
  const { name, email, password, role, isPredefined } = req.body;

  if (!name || !email || !password) {
    console.log("Validation échouée: Tous les champs sont requis.");
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    console.log("L'email est déjà utilisé:", email);
    return res.status(400).json({ message: "L'email est déjà utilisé" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = new User({ name, email, password: hashedPassword, role, isPredefined });
    await user.save();
    console.log("Utilisateur créé:", user);
    res.json({ message: "Utilisateur créé avec succès" });
  } catch (err) {
    console.error("Erreur lors de l'enregistrement de l'utilisateur:", err);
    res.status(500).json({ message: "Erreur serveur lors de l'inscription" });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  // Vérification que l'email et le mot de passe sont présents dans la requête
  if (!email || !password) {
    return res.status(400).json({ message: "Email et mot de passe sont requis" });
  }

  try {
    // Recherche de l'utilisateur dans la base de données
    const user = await User.findOne({ email });

    // Si l'utilisateur n'existe pas ou que le mot de passe ne correspond pas
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Identifiants incorrects" });
    }

    // Génération d'un token JWT pour l'utilisateur
    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Réponse avec le token, le rôle et les autres informations utiles
    res.json({
      token,
      role: user.role,
      userId: user._id,
      name: user.name,
    });

  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});



module.exports = router;
