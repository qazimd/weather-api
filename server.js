require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const weatherRoutes = require('./src/routes/weatherRoutes');
const authRoutes = require('./src/routes/authRoutes');
const countryRoutes = require('./src/routes/countryRoutes');

const app = express();

// Trust proxy for rate limiting
app.set('trust proxy', 1);

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/countries', countryRoutes);
app.use('/api/weather', weatherRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Explicitly set port to 3000 for backend
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
  console.log('Available routes:');
  console.log('- /api/auth/* - Authentication routes');
  console.log('- /api/countries/* - Country routes');
  console.log('- /api/weather/* - Weather data routes');
}); 