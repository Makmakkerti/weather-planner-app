const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { resolve } = require("path");

const citiesRoutes = require("./routes/cities");
const weatherRoutes = require("./routes/weather");

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const uiFolderAbsolutePath = process.env.PRODUCTION
  ? "./ui/"
  : resolve("./ui/");
app.use(express.static(uiFolderAbsolutePath));

const uiAbsolutePath = process.env.PRODUCTION
  ? "./ui/index.html"
  : resolve("./ui/index.html");
app.get("/", (req, res) => {
  res.sendFile(uiAbsolutePath);
});

const cors = require("cors");
app.use(cors());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PATCH, PUT, DELETE, OPTIONS"
//   );
//   next();
// });

app.use("/api/cities", citiesRoutes);
app.use("/api/weather", weatherRoutes);

app.get("*", (req, res) => {
  res.redirect("/");
});

module.exports = app;
