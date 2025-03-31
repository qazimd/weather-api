const db = require('../config/database');
const weatherApi = require('../utils/weatherApi');

exports.getWeatherByCountry = async (req, res) => {
  try {
    const { countryId } = req.params;
    
    // Get country details from database
    const country = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM countries WHERE id = ?', [countryId], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });

    if (!country) {
      return res.status(404).json({ error: 'Country not found' });
    }

    // Get weather data for the country's capital
    const weatherData = await weatherApi.getCurrentWeather(country.capital);
    
    // Store the weather data in SQLite
    const stmt = db.prepare(`
      INSERT INTO weather_history (city, temperature, humidity, windSpeed, description)
      VALUES (?, ?, ?, ?, ?)
    `);
    
    stmt.run(
      country.capital,
      weatherData.main.temp,
      weatherData.main.humidity,
      weatherData.wind.speed,
      weatherData.weather[0].description
    );
    
    stmt.finalize();

    // Return combined country and weather data
    res.json({
      country: {
        id: country.id,
        name: country.name,
        capital: country.capital
      },
      weather: weatherData
    });
  } catch (error) {
    console.error('Error fetching weather by country:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};

exports.getCurrentWeather = async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }

    const weatherData = await weatherApi.getCurrentWeather(city);
    
    // Store the weather data in SQLite
    const stmt = db.prepare(`
      INSERT INTO weather_history (city, temperature, humidity, windSpeed, description)
      VALUES (?, ?, ?, ?, ?)
    `);
    
    stmt.run(
      weatherData.city,
      weatherData.temperature,
      weatherData.humidity,
      weatherData.windSpeed,
      weatherData.description
    );
    
    stmt.finalize();

    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getForecast = async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }

    const forecast = await weatherApi.getForecast(city);
    res.json(forecast);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }

    db.all(
      `SELECT * FROM weather_history 
       WHERE city = ? 
       ORDER BY timestamp DESC 
       LIMIT 10`,
      [city],
      (err, rows) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json(rows);
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 