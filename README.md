# Weather Data API Service

A RESTful API service that provides current weather, forecast, and historical weather data using the OpenWeatherMap API and SQLite for data storage.

## Prerequisites

Before running this application, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd weather-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following content:
```plaintext
PORT=3000
OPENWEATHERMAP_API_KEY=your_api_key_here
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on port 3000 (or the port specified in your .env file). The SQLite database file (weather.db) will be automatically created in the project root directory.

## Using the CLI Tool

Check current weather for a city using the command line:
```bash
npm run weather "London"
```

## API Endpoints

### Get Current Weather
```bash
GET http://localhost:3000/weather/current?city={city_name}
```

### Get Weather Forecast
```bash
GET http://localhost:3000/weather/forecast?city={city_name}
```

### Get Historical Weather Data
```bash
GET http://localhost:3000/weather/history?city={city_name}
```

## Example API Response

```json
{
  "city": "London",
  "temperature": 18.2,
  "humidity": 72,
  "windSpeed": 3.6,
  "description": "scattered clouds"
}
```

## Data Storage

The application uses SQLite to store historical weather data. The database file (weather.db) is created automatically when you first run the application. Each weather query is stored in the `weather_history` table with the following structure:

- id (INTEGER PRIMARY KEY)
- city (TEXT)
- temperature (REAL)
- humidity (INTEGER)
- windSpeed (REAL)
- description (TEXT)
- timestamp (DATETIME)

## Troubleshooting

1. **Database Issues**
   - Check if the application has write permissions in the project directory
   - Verify the weather.db file is created in the root directory
   - Check server logs for any SQLite-related errors

2. **API Key Issues**
   - Verify your OpenWeatherMap API key in .env is valid
   - Check for any error messages in the console

3. **Port Already in Use**
   - Change the PORT in .env file
   - Check if another service is using port 3000

## Error Messages

- "Database connection error": Check file permissions and disk space
- "City parameter is required": Ensure city name is provided in the request
- "Failed to fetch current weather": Verify API key and city name

## Rate Limiting

The API is rate-limited to 100 requests per 15 minutes per IP address to prevent abuse.
```