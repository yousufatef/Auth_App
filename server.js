const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const { connectDB } = require("./config/dbConn");
const mongoose = require("mongoose");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB(); // Call the function to connect to the database

// Middleware
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/", require("./routes/root"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/users", require("./routes/userRoutes"));

// 404 Error Handler
app.use((req, res, next) => {
  res.status(404).send("Page Not Found");
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});