const axios = require('axios');

class WeatherAPI {
  constructor() {
    this.apiKey = process.env.OPENWEATHERMAP_API_KEY;
    this.baseUrl = 'https://api.openweathermap.org/data/2.5';
  }

  async getCurrentWeather(city) {
    try {
      const response = await axios.get(`${this.baseUrl}/weather`, {
        params: {
          q: city,
          appid: this.apiKey,
          units: 'metric'
        }
      });

      return {
        city: response.data.name,
        temperature: response.data.main.temp,
        humidity: response.data.main.humidity,
        windSpeed: response.data.wind.speed,
        description: response.data.weather[0].description
      };
    } catch (error) {
      throw new Error(`Failed to fetch current weather: ${error.message}`);
    }
  }

  async getForecast(city) {
    try {
      const response = await axios.get(`${this.baseUrl}/forecast`, {
        params: {
          q: city,
          appid: this.apiKey,
          units: 'metric'
        }
      });

      return response.data.list.map(item => ({
        city: response.data.city.name,
        temperature: item.main.temp,
        humidity: item.main.humidity,
        windSpeed: item.wind.speed,
        description: item.weather[0].description,
        timestamp: item.dt_txt
      }));
    } catch (error) {
      throw new Error(`Failed to fetch forecast: ${error.message}`);
    }
  }
}

module.exports = new WeatherAPI(); 