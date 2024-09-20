const express = require("express");
const app = express();
const employeeRoutes = require("./routes/employeeRoutes");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());

app.use(express.json());

// Middleware for parsing request bodies (application/json)
app.use(bodyParser.json());

// Use the employee routes for handling employee-related requests
app.use("/api/employees", employeeRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
    },
  });
});

const start = async () => {
  await mongoose
    .connect("mongodb://0.0.0.0:27017/passSAFE", {
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

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
