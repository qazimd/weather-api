const db = require('../config/database');
const weatherApi = require('../utils/weatherApi');

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