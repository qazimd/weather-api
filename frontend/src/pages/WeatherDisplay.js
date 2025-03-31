import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from '../components/NavigationBar';
import '../styles.css';

const WeatherDisplay = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { countryId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching weather for country ID:', countryId);
        const response = await axios.get(`/api/weather/${countryId}`);
        console.log('Weather API response:', response.data);
        setData(response.data);
      } catch (err) {
        console.error('Error fetching weather:', err);
        console.error('Error details:', err.response?.data);
        setError(err.response?.data?.message || 'Failed to fetch weather data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (countryId) {
      fetchWeather();
    } else {
      setError('No country ID provided');
      setLoading(false);
    }
  }, [countryId]);

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  if (loading) {
    return (
      <div>
        <NavigationBar />
        <div className="container">
          <div className="loading-message">Loading weather data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <NavigationBar />
        <div className="container">
          <div className="error-message">{error}</div>
          <button onClick={handleBack} className="btn back-btn">Go Back</button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <NavigationBar />
        <div className="container">
          <div className="error-message">No weather data available.</div>
          <button onClick={handleBack} className="btn back-btn">Go Back</button>
        </div>
      </div>
    );
  }

  const { country, weather } = data;

  return (
    <div>
      <NavigationBar />
      <div className="weather-display">
        <div className="weather-header">
          <button onClick={handleBack} className="back-btn">
            ← Back
          </button>
          <h2 className="weather-title">Weather in {country.capital}, {country.name}</h2>
        </div>
        <div className="weather-card">
          <div className="weather-info">
            <div className="main-weather">
              <div className="temperature-section">
                <div className="temperature">
                  {Math.round(weather.main.temp)}°C
                </div>
                <div className="feels-like">
                  Feels like {Math.round(weather.main.feels_like)}°C
                </div>
              </div>
              <div className="weather-description">
                <div className="description">
                  {weather.weather[0].description}
                </div>
                <div className="humidity">
                  Humidity: {weather.main.humidity}%
                </div>
              </div>
            </div>
            <div className="weather-details">
              <div className="detail-item">
                <div className="label">Wind Speed</div>
                <div className="value">{weather.wind.speed} m/s</div>
              </div>
              {weather.main.pressure && (
                <div className="detail-item">
                  <div className="label">Pressure</div>
                  <div className="value">{weather.main.pressure} hPa</div>
                </div>
              )}
              {weather.visibility && (
                <div className="detail-item">
                  <div className="label">Visibility</div>
                  <div className="value">{weather.visibility / 1000} km</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay; 