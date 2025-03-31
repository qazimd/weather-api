const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get countries by region
router.get('/:regionId', async (req, res) => {
  try {
    const { regionId } = req.params;
    console.log('Fetching countries for region:', regionId);
    
    const query = 'SELECT * FROM countries WHERE region_id = ?';
    const countries = await new Promise((resolve, reject) => {
      db.all(query, [regionId], (err, rows) => {
        if (err) {
          console.error('Database error:', err);
          reject(err);
        } else {
          console.log('Found countries:', rows);
          resolve(rows);
        }
      });
    });

    if (!Array.isArray(countries)) {
      console.error('Invalid response from database:', countries);
      return res.status(500).json({ error: 'Invalid response from database' });
    }

    res.json(countries);
  } catch (error) {
    console.error('Error fetching countries:', error);
    res.status(500).json({ error: 'Failed to fetch countries' });
  }
});

module.exports = router; 