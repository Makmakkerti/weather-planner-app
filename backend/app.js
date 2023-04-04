const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const citiesRoutes = require("./routes/cities");
// const weatherRoutes = require("./routes/weather");

const app = express();

mongoose
  .connect(
    "mongodb+srv://test:test7874507@mkcluster.6dowtqs.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/cities", citiesRoutes);
// app.use("/api/weather", postsRoutes);

module.exports = app;