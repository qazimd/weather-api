#!/usr/bin/env node
require('dotenv').config();
const weatherApi = require('../utils/weatherApi');

const city = process.argv[2];

if (!city) {
  console.error('Please provide a city name');
  console.log('Usage: npm run weather <city>');
  process.exit(1);
}

async function getWeather() {
  try {
    const weather = await weatherApi.getCurrentWeather(city);
    console.log('\nCurrent Weather:');
    console.log('---------------');
    console.log(`City: ${weather.city}`);
    console.log(`Temperature: ${weather.temperature}°C`);
    console.log(`Humidity: ${weather.humidity}%`);
    console.log(`Wind Speed: ${weather.windSpeed} m/s`);
    console.log(`Description: ${weather.description}`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

getWeather(); 