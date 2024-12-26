import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute';
import rvuLogo from './rvu-logo.png';
import rvuBackground from './rvuni.png';

const clientId = '413792080053-i5gc4eg3lv5c8fotvpnof8g9coj068f1.apps.googleusercontent.com';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSuccess = (response) => {
    try {
      const decodedToken = JSON.parse(atob(response.credential.split('.')[1]));
      console.log('User logged in:', decodedToken); // Debugging
      setIsAuthenticated(true); // Mark user as authenticated
    } catch (error) {
      console.error('Failed to decode token:', error);
    }
  };

  const handleFailure = () => {
    alert('Failed to log in. Please try again.');
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <Routes>
          {/* Login Page */}
          <Route
            path="/"
            element={
              <div style={styles.container}>
                <div style={styles.box}>
                  <img
                    src={rvuLogo}
                    alt="RVU Logo"
                    style={styles.logo}
                    onClick={() => window.location.href = "https://rvu.edu.in/"}
                  />
                  <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
                </div>
              </div>
            }
          />

          {/* Dashboard - Protected Route */}
          <Route
            path="/Dashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url(${rvuBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'overlay',
  },
  box: {
    width: '400px',
    padding: '30px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '15px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  logo: {
    width: '150px',
    marginBottom: '20px',
    cursor: 'pointer',
    transition: 'transform 0.3s',
  },
};

export default App;
