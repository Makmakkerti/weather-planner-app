const express = require("express");

const City = require("../models/city");

const router = express.Router();

router.post("", (req, res, next) => {
  const city = new City({
    name: req.body.title,
    label: req.body.content,
    description: req.body.description,
  });
  city.save().then((createdCity) => {
    res.status(201).json({
      message: "City added successfully",
      cityId: createdCity._id,
    });
  });
});

router.get("", (req, res, next) => {
  City.find().then((cities) => {
    const filtered = cities.map((city) => city.label);
    res.status(200).json({
      message: "Cities fetched successfully!",
      cities: filtered,
    });
  });
});

module.exports = router;
