
const mongoose = require("mongoose");

const MONGO_URI = "mongodb+srv://samiraettaqy:samiraMongoose@cluster0.njz9h.mongodb.net/BistroRestaurant?retryWrites=true&w=majority&appName=Cluster0";
const PORT = 5000;
const JWT_SECRET = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30";


const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Failed", error);
    process.exit(1);
  }
};

module.exports = { connectDB, JWT_SECRET, PORT };

