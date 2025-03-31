const axios = require('axios');

class WeatherAPI {
  constructor() {
    this.apiKey = process.env.OPENWEATHERMAP_API_KEY;
    this.baseUrl = 'https://api.openweathermap.org/data/2.5';
  }

  async getCurrentWeather(city) {
    try {
      console.log('Fetching weather for city:', city);
      console.log('Using API key:', this.apiKey ? 'Present' : 'Missing');
      
      const response = await axios.get(`${this.baseUrl}/weather`, {
        params: {
          q: city,
          appid: this.apiKey,
          units: 'metric'
        }
      });

      console.log('Weather API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Weather API error:', error.response?.data || error.message);
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

      return response.data;
    } catch (error) {
      console.error('Weather API error:', error.response?.data || error.message);
      throw new Error(`Failed to fetch forecast: ${error.message}`);
    }
  }
}

module.exports = new WeatherAPI(); 