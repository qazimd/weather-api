const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

// Get weather by country ID
router.get('/:countryId', weatherController.getWeatherByCountry);

// Get current weather by city
router.get('/current', weatherController.getCurrentWeather);

// Get forecast by city
router.get('/forecast', weatherController.getForecast);

// Get weather history by city
router.get('/history', weatherController.getHistory);

module.exports = router; 