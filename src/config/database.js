const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../../weather.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to SQLite database');
    initDatabase();
  }
});

function initDatabase() {
  db.run(`
    CREATE TABLE IF NOT EXISTS weather_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      city TEXT NOT NULL,
      temperature REAL NOT NULL,
      humidity INTEGER NOT NULL,
      windSpeed REAL NOT NULL,
      description TEXT NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS countries (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      capital TEXT NOT NULL,
      region_id TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Europe countries
  const europeCountries = [
    { id: 1, name: 'United Kingdom', capital: 'London', region_id: 'europe' },
    { id: 2, name: 'France', capital: 'Paris', region_id: 'europe' },
    { id: 3, name: 'Germany', capital: 'Berlin', region_id: 'europe' },
    { id: 4, name: 'Italy', capital: 'Rome', region_id: 'europe' },
    { id: 5, name: 'Spain', capital: 'Madrid', region_id: 'europe' },
    { id: 6, name: 'Portugal', capital: 'Lisbon', region_id: 'europe' },
    { id: 7, name: 'Netherlands', capital: 'Amsterdam', region_id: 'europe' },
    { id: 8, name: 'Belgium', capital: 'Brussels', region_id: 'europe' },
    { id: 9, name: 'Switzerland', capital: 'Bern', region_id: 'europe' },
    { id: 10, name: 'Austria', capital: 'Vienna', region_id: 'europe' },
    { id: 11, name: 'Sweden', capital: 'Stockholm', region_id: 'europe' },
    { id: 12, name: 'Norway', capital: 'Oslo', region_id: 'europe' },
    { id: 13, name: 'Denmark', capital: 'Copenhagen', region_id: 'europe' },
    { id: 14, name: 'Finland', capital: 'Helsinki', region_id: 'europe' },
    { id: 15, name: 'Ireland', capital: 'Dublin', region_id: 'europe' },
    { id: 16, name: 'Poland', capital: 'Warsaw', region_id: 'europe' },
    { id: 17, name: 'Czech Republic', capital: 'Prague', region_id: 'europe' },
    { id: 18, name: 'Hungary', capital: 'Budapest', region_id: 'europe' },
    { id: 19, name: 'Romania', capital: 'Bucharest', region_id: 'europe' },
    { id: 20, name: 'Bulgaria', capital: 'Sofia', region_id: 'europe' },
    { id: 21, name: 'Greece', capital: 'Athens', region_id: 'europe' },
    { id: 22, name: 'Croatia', capital: 'Zagreb', region_id: 'europe' },
    { id: 23, name: 'Slovakia', capital: 'Bratislava', region_id: 'europe' },
    { id: 24, name: 'Slovenia', capital: 'Ljubljana', region_id: 'europe' },
    { id: 25, name: 'Estonia', capital: 'Tallinn', region_id: 'europe' },
    { id: 26, name: 'Latvia', capital: 'Riga', region_id: 'europe' },
    { id: 27, name: 'Lithuania', capital: 'Vilnius', region_id: 'europe' },
    { id: 28, name: 'Luxembourg', capital: 'Luxembourg City', region_id: 'europe' },
    { id: 29, name: 'Malta', capital: 'Valletta', region_id: 'europe' },
    { id: 30, name: 'Cyprus', capital: 'Nicosia', region_id: 'europe' },
    { id: 31, name: 'Iceland', capital: 'Reykjavík', region_id: 'europe' },
    { id: 32, name: 'Albania', capital: 'Tirana', region_id: 'europe' },
    { id: 33, name: 'Bosnia and Herzegovina', capital: 'Sarajevo', region_id: 'europe' },
    { id: 34, name: 'Montenegro', capital: 'Podgorica', region_id: 'europe' },
    { id: 35, name: 'North Macedonia', capital: 'Skopje', region_id: 'europe' },
    { id: 36, name: 'Serbia', capital: 'Belgrade', region_id: 'europe' },
    { id: 37, name: 'Kosovo', capital: 'Pristina', region_id: 'europe' },
    { id: 38, name: 'Moldova', capital: 'Chișinău', region_id: 'europe' },
    { id: 39, name: 'Ukraine', capital: 'Kyiv', region_id: 'europe' },
    { id: 40, name: 'Belarus', capital: 'Minsk', region_id: 'europe' },
    { id: 41, name: 'Russia', capital: 'Moscow', region_id: 'europe' },
    { id: 42, name: 'Andorra', capital: 'Andorra la Vella', region_id: 'europe' },
    { id: 43, name: 'Liechtenstein', capital: 'Vaduz', region_id: 'europe' },
    { id: 44, name: 'Monaco', capital: 'Monaco', region_id: 'europe' },
    { id: 45, name: 'San Marino', capital: 'San Marino', region_id: 'europe' },
    { id: 46, name: 'Vatican City', capital: 'Vatican City', region_id: 'europe' }
  ];

  // America countries
  const americaCountries = [
    { id: 47, name: 'United States', capital: 'Washington, D.C.', region_id: 'america' },
    { id: 48, name: 'Canada', capital: 'Ottawa', region_id: 'america' },
    { id: 49, name: 'Mexico', capital: 'Mexico City', region_id: 'america' },
    { id: 50, name: 'Brazil', capital: 'Brasília', region_id: 'america' },
    { id: 51, name: 'Argentina', capital: 'Buenos Aires', region_id: 'america' },
    { id: 52, name: 'Colombia', capital: 'Bogotá', region_id: 'america' },
    { id: 53, name: 'Peru', capital: 'Lima', region_id: 'america' },
    { id: 54, name: 'Chile', capital: 'Santiago', region_id: 'america' },
    { id: 55, name: 'Venezuela', capital: 'Caracas', region_id: 'america' },
    { id: 56, name: 'Ecuador', capital: 'Quito', region_id: 'america' },
    { id: 57, name: 'Bolivia', capital: 'La Paz', region_id: 'america' },
    { id: 58, name: 'Paraguay', capital: 'Asunción', region_id: 'america' },
    { id: 59, name: 'Uruguay', capital: 'Montevideo', region_id: 'america' },
    { id: 60, name: 'Cuba', capital: 'Havana', region_id: 'america' },
    { id: 61, name: 'Dominican Republic', capital: 'Santo Domingo', region_id: 'america' },
    { id: 62, name: 'Haiti', capital: 'Port-au-Prince', region_id: 'america' },
    { id: 63, name: 'Jamaica', capital: 'Kingston', region_id: 'america' },
    { id: 64, name: 'Trinidad and Tobago', capital: 'Port of Spain', region_id: 'america' },
    { id: 65, name: 'Panama', capital: 'Panama City', region_id: 'america' },
    { id: 66, name: 'Costa Rica', capital: 'San José', region_id: 'america' },
    { id: 67, name: 'Nicaragua', capital: 'Managua', region_id: 'america' },
    { id: 68, name: 'Honduras', capital: 'Tegucigalpa', region_id: 'america' },
    { id: 69, name: 'El Salvador', capital: 'San Salvador', region_id: 'america' },
    { id: 70, name: 'Guatemala', capital: 'Guatemala City', region_id: 'america' },
    { id: 71, name: 'Belize', capital: 'Belmopan', region_id: 'america' },
    { id: 72, name: 'Suriname', capital: 'Paramaribo', region_id: 'america' },
    { id: 73, name: 'Guyana', capital: 'Georgetown', region_id: 'america' },
    { id: 74, name: 'Barbados', capital: 'Bridgetown', region_id: 'america' },
    { id: 75, name: 'Bahamas', capital: 'Nassau', region_id: 'america' },
    { id: 76, name: 'Grenada', capital: 'St. George\'s', region_id: 'america' },
    { id: 77, name: 'Saint Vincent and the Grenadines', capital: 'Kingstown', region_id: 'america' },
    { id: 78, name: 'Saint Lucia', capital: 'Castries', region_id: 'america' },
    { id: 79, name: 'Saint Kitts and Nevis', capital: 'Basseterre', region_id: 'america' },
    { id: 80, name: 'Antigua and Barbuda', capital: 'Saint John\'s', region_id: 'america' },
    { id: 81, name: 'Dominica', capital: 'Roseau', region_id: 'america' },
    { id: 82, name: 'Greenland', capital: 'Nuuk', region_id: 'america' },
    { id: 83, name: 'Bermuda', capital: 'Hamilton', region_id: 'america' },
    { id: 84, name: 'Aruba', capital: 'Oranjestad', region_id: 'america' },
    { id: 85, name: 'Curaçao', capital: 'Willemstad', region_id: 'america' },
    { id: 86, name: 'Sint Maarten', capital: 'Philipsburg', region_id: 'america' }
  ];

  // Asia countries
  const asiaCountries = [
    { id: 87, name: 'China', capital: 'Beijing', region_id: 'asia' },
    { id: 88, name: 'Japan', capital: 'Tokyo', region_id: 'asia' },
    { id: 89, name: 'India', capital: 'New Delhi', region_id: 'asia' },
    { id: 90, name: 'South Korea', capital: 'Seoul', region_id: 'asia' },
    { id: 91, name: 'Singapore', capital: 'Singapore', region_id: 'asia' },
    { id: 92, name: 'Thailand', capital: 'Bangkok', region_id: 'asia' },
    { id: 93, name: 'Vietnam', capital: 'Hanoi', region_id: 'asia' },
    { id: 94, name: 'Malaysia', capital: 'Kuala Lumpur', region_id: 'asia' },
    { id: 95, name: 'Indonesia', capital: 'Jakarta', region_id: 'asia' },
    { id: 96, name: 'Philippines', capital: 'Manila', region_id: 'asia' },
    { id: 97, name: 'Pakistan', capital: 'Islamabad', region_id: 'asia' },
    { id: 98, name: 'Bangladesh', capital: 'Dhaka', region_id: 'asia' },
    { id: 99, name: 'Sri Lanka', capital: 'Colombo', region_id: 'asia' },
    { id: 100, name: 'Nepal', capital: 'Kathmandu', region_id: 'asia' },
    { id: 101, name: 'Bhutan', capital: 'Thimphu', region_id: 'asia' },
    { id: 102, name: 'Myanmar', capital: 'Naypyidaw', region_id: 'asia' },
    { id: 103, name: 'Cambodia', capital: 'Phnom Penh', region_id: 'asia' },
    { id: 104, name: 'Laos', capital: 'Vientiane', region_id: 'asia' },
    { id: 105, name: 'Mongolia', capital: 'Ulaanbaatar', region_id: 'asia' },
    { id: 106, name: 'Kazakhstan', capital: 'Nur-Sultan', region_id: 'asia' },
    { id: 107, name: 'Uzbekistan', capital: 'Tashkent', region_id: 'asia' },
    { id: 108, name: 'Turkmenistan', capital: 'Ashgabat', region_id: 'asia' },
    { id: 109, name: 'Kyrgyzstan', capital: 'Bishkek', region_id: 'asia' },
    { id: 110, name: 'Tajikistan', capital: 'Dushanbe', region_id: 'asia' },
    { id: 111, name: 'Afghanistan', capital: 'Kabul', region_id: 'asia' },
    { id: 112, name: 'Iran', capital: 'Tehran', region_id: 'asia' },
    { id: 113, name: 'Iraq', capital: 'Baghdad', region_id: 'asia' },
    { id: 114, name: 'Syria', capital: 'Damascus', region_id: 'asia' },
    { id: 115, name: 'Lebanon', capital: 'Beirut', region_id: 'asia' },
    { id: 116, name: 'Jordan', capital: 'Amman', region_id: 'asia' },
    { id: 117, name: 'Saudi Arabia', capital: 'Riyadh', region_id: 'asia' },
    { id: 118, name: 'United Arab Emirates', capital: 'Abu Dhabi', region_id: 'asia' },
    { id: 119, name: 'Qatar', capital: 'Doha', region_id: 'asia' },
    { id: 120, name: 'Bahrain', capital: 'Manama', region_id: 'asia' },
    { id: 121, name: 'Kuwait', capital: 'Kuwait City', region_id: 'asia' },
    { id: 122, name: 'Oman', capital: 'Muscat', region_id: 'asia' },
    { id: 123, name: 'Yemen', capital: 'Sana\'a', region_id: 'asia' },
    { id: 124, name: 'Israel', capital: 'Jerusalem', region_id: 'asia' },
    { id: 125, name: 'Palestine', capital: 'Ramallah', region_id: 'asia' },
    { id: 126, name: 'North Korea', capital: 'Pyongyang', region_id: 'asia' },
    { id: 127, name: 'Taiwan', capital: 'Taipei', region_id: 'asia' },
    { id: 128, name: 'Hong Kong', capital: 'Hong Kong', region_id: 'asia' },
    { id: 129, name: 'Macau', capital: 'Macau', region_id: 'asia' },
    { id: 130, name: 'Brunei', capital: 'Bandar Seri Begawan', region_id: 'asia' },
    { id: 131, name: 'Timor-Leste', capital: 'Dili', region_id: 'asia' },
    { id: 132, name: 'Maldives', capital: 'Male', region_id: 'asia' },
    { id: 133, name: 'Georgia', capital: 'Tbilisi', region_id: 'asia' },
    { id: 134, name: 'Armenia', capital: 'Yerevan', region_id: 'asia' },
    { id: 135, name: 'Azerbaijan', capital: 'Baku', region_id: 'asia' },
    { id: 136, name: 'Turkey', capital: 'Ankara', region_id: 'asia' },
    { id: 137, name: 'Cyprus', capital: 'Nicosia', region_id: 'asia' }
  ];

  // Australia/Oceania countries
  const australiaCountries = [
    { id: 138, name: 'Australia', capital: 'Canberra', region_id: 'australia' },
    { id: 139, name: 'New Zealand', capital: 'Wellington', region_id: 'australia' },
    { id: 140, name: 'Fiji', capital: 'Suva', region_id: 'australia' },
    { id: 141, name: 'Papua New Guinea', capital: 'Port Moresby', region_id: 'australia' },
    { id: 142, name: 'Samoa', capital: 'Apia', region_id: 'australia' },
    { id: 143, name: 'Tonga', capital: 'Nuku\'alofa', region_id: 'australia' },
    { id: 144, name: 'Vanuatu', capital: 'Port Vila', region_id: 'australia' },
    { id: 145, name: 'Solomon Islands', capital: 'Honiara', region_id: 'australia' },
    { id: 146, name: 'Kiribati', capital: 'South Tarawa', region_id: 'australia' },
    { id: 147, name: 'Tuvalu', capital: 'Funafuti', region_id: 'australia' },
    { id: 148, name: 'Nauru', capital: 'Yaren', region_id: 'australia' },
    { id: 149, name: 'Marshall Islands', capital: 'Majuro', region_id: 'australia' },
    { id: 150, name: 'Palau', capital: 'Ngerulmud', region_id: 'australia' },
    { id: 151, name: 'Micronesia', capital: 'Palikir', region_id: 'australia' }
  ];

  // Combine all countries
  const allCountries = [
    ...europeCountries,
    ...americaCountries,
    ...asiaCountries,
    ...australiaCountries
  ];

  // Insert all countries
  allCountries.forEach(country => {
    db.run(
      'INSERT OR REPLACE INTO countries (id, name, capital, region_id) VALUES (?, ?, ?, ?)',
      [country.id, country.name, country.capital, country.region_id]
    );
  });
}

module.exports = db; 