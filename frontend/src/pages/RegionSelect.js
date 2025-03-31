import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import { regions } from '../data/regions';
import '../styles.css';

const RegionSelect = () => {
  const navigate = useNavigate();

  const handleRegionClick = (regionId) => {
    navigate(`/countries/${regionId}`);
  };

  return (
    <div>
      <NavigationBar />
      <div className="regions-container">
        <h1 className="page-title">Select a Region</h1>
        <div className="regions-grid">
          {regions.map((region) => (
            <div
              key={region.id}
              className="region-card"
              onClick={() => handleRegionClick(region.id)}
            >
              <h2>{region.name}</h2>
              <p>{region.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegionSelect; 