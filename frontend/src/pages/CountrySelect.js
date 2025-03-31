import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import { regions } from '../data/regions';
import '../styles.css';

const CountrySelect = () => {
  const { regionId } = useParams();
  const navigate = useNavigate();

  const region = regions.find(r => r.id === regionId);
  const countries = region ? region.countries : [];

  const handleCountryClick = (countryId) => {
    navigate(`/weather/${countryId}`);
  };

  if (!region) {
    return (
      <div>
        <NavigationBar />
        <div className="container">
          <div className="error-message">Region not found</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavigationBar />
      <div className="countries-container">
        <h1 className="page-title">Select a Country in {region.name}</h1>
        <div className="countries-grid">
          {countries.map((country) => (
            <div
              key={country.id}
              className="country-card"
              onClick={() => handleCountryClick(country.id)}
            >
              <h2>{country.name}</h2>
              <p>{country.capital}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CountrySelect; 