const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "client", "cuisinier", "caissier", "livreur"], default: "client" },
  isPredefined: { type: Boolean, default: false }, 

});





const User = mongoose.model("User", userSchema);
module.exports = User;
