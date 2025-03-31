import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import './styles.css';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import RegionSelect from './pages/RegionSelect';
import CountrySelect from './pages/CountrySelect';
import WeatherDisplay from './pages/WeatherDisplay';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <RegionSelect />
              </ProtectedRoute>
            }
          />
          <Route
            path="/countries/:regionId"
            element={
              <ProtectedRoute>
                <CountrySelect />
              </ProtectedRoute>
            }
          />
          <Route
            path="/weather/:countryId"
            element={
              <ProtectedRoute>
                <WeatherDisplay />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App; 