const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose
      .connect("mongodb://localhost:27017/portal?socketTimeoutMS=9000", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Database connected successfully");
      })
      .catch((err) => {
        console.error("Database connection error:", err);
      });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};
module.exports = connectDB;
