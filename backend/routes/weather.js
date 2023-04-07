const express = require("express");
const router = express.Router();
const axios = require("axios");
const City = require("../models/city");

router.get("", async (req, res, next) => {
  const city = req.query.city || undefined;
  if (!city) {
    return next(Error("Weather service: city name was not provided"));
  }

  try {
    const [cityInformation] = await City.find({
      name: city.toLocaleLowerCase(),
    });

    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPEN_WEATHER_MAP_KEY}&units=metric`
    );
    res.json({ ...data, city: cityInformation });
  } catch (error) {
    error.message = `Weather service error: ${error.message}`;
    return next(error);
  }
});

module.exports = router;
