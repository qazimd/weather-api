# Weather Application

A full-stack weather application that provides current weather data for countries across different regions. The application features user authentication, region-based country selection, and detailed weather information for capital cities.

## Features

- User Authentication (Register/Login)
- Region-based country selection (Europe, America, Asia, Australia)
- Current weather data for capital cities
- Weather history tracking
- Responsive and modern UI
- Secure API endpoints with JWT authentication

## Prerequisites

Before running this application, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher)

## Project Structure

```
weather-api/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── data/           # Static data (regions, countries)
│   │   └── styles.css      # Global styles
│   └── package.json
├── src/                     # Backend source code
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   └── server.js          # Main server file
└── package.json
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd weather-api
```

2. Install backend dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
cd ..
```

4. Create a `.env` file in the root directory with the following content:
```plaintext
PORT=3001
OPENWEATHERMAP_API_KEY=your_api_key_here
JWT_SECRET=your_jwt_secret_here
```

## Running the Application

Start both the backend and frontend servers with a single command:
```bash
npm run dev
```

This will start:
- Backend server on port 3001
- Frontend application on port 3001

The application will be available at http://localhost:3001.

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `GET /auth/verify` - Verify JWT token

### Weather
- `GET /weather/:countryId` - Get weather by country ID
- `GET /weather/current` - Get current weather by city
- `GET /weather/forecast` - Get forecast by city
- `GET /weather/history` - Get weather history by city

### Countries
- `GET /countries/:regionId` - Get countries by region

## Database Schema

### Users Table
- id (INTEGER PRIMARY KEY)
- email (TEXT UNIQUE)
- password (TEXT)
- name (TEXT)
- created_at (DATETIME)

### Countries Table
- id (INTEGER PRIMARY KEY)
- name (TEXT)
- capital (TEXT)
- region_id (TEXT)
- created_at (DATETIME)

### Weather History Table
- id (INTEGER PRIMARY KEY)
- city (TEXT)
- temperature (REAL)
- humidity (INTEGER)
- windSpeed (REAL)
- description (TEXT)
- timestamp (DATETIME)

## Example API Response

```json
{
  "city": "Pristina",
  "temperature": 18.2,
  "humidity": 72,
  "windSpeed": 3.6,
  "description": "scattered clouds"
}
```

## Troubleshooting

1. **Database Issues**
   - Check if the application has write permissions in the project directory
   - Verify the weather.db file is created in the root directory
   - Check server logs for any SQLite-related errors

2. **API Key Issues**
   - Verify your OpenWeatherMap API key in .env is valid
   - Check for any error messages in the console

3. **Authentication Issues**
   - Ensure JWT_SECRET is set in .env
   - Check if the token is being properly sent in the Authorization header
   - Verify the token format: "Bearer <token>"

4. **Frontend Issues**
   - Check the browser console for any errors
   - Verify that the backend server is running and accessible
   - Ensure all environment variables are properly set

## Error Messages

- "Database connection error": Check file permissions and disk space
- "City parameter is required": Ensure city name is provided in the request
- "Failed to fetch current weather": Verify API key and city name

## Rate Limiting

The API is rate-limited to 100 requests per 15 minutes per IP address to prevent abuse.