const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("", async (req, res, next) => {
  const { city = "London" } = req.query;
  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPEN_WEATHER_MAP_KEY}`
    );
    res.json(data);
  } catch (error) {
    error.message = `Weather service error: ${error.message}`;
    return next(error);
  }
});

module.exports = router;
