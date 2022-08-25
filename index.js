const dotnev = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// express app
const app = express();

// connect to mongodb
// const dbName = "users";
const dbName = "test";
const dbURI =
  "mongodb+srv://root:sachin@cluster0.nw0frgz.mongodb.net/?retryWrites=true&w=majority";
// "mongodb+srv://yash:Yash12345@cluster0.uwpqj.mongodb.net/userDB?retryWrites=true&w=majority";

mongoose.connect(dbURI, { dbName: dbName });

mongoose.connection.on("connected", () => {
  console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error:", err);
});
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});
// middleware
app.use(cors());
app.use(express.json());

// API routes
require("./routes")(app);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
