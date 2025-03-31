import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles.css';

const NavigationBar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="nav-bar">
      <div className="nav-content">
        <div className="nav-brand">
<Link to="/" className="nav-logo">Weather Application</Link>
        </div>
        <div className="nav-links">
          {isAuthenticated ? (
            <>
              <Link to="/" className="nav-link">Regions</Link>
              <button onClick={handleLogout} className="nav-link logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar; 