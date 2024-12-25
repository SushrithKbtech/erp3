import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import rvuLogo from './rvu-logo.png';  // Import the logo from src folder

// Replace with your OAuth Client ID
const clientId = '413792080053-i5gc4eg3lv5c8fotvpnof8g9coj068f1.apps.googleusercontent.com';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleSuccess = (response) => {
    const decodedToken = JSON.parse(atob(response.credential.split('.')[1]));
    setUser(decodedToken);
    setIsLoggedIn(true);
    setError(null);
  };

  const handleFailure = () => {
    setError('Login failed. Please try again.');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setError(null);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div style={styles.container}>
        <div style={styles.header}>
          {/* Use the logo from the src folder */}
          <img 
            src={rvuLogo} 
            alt="RV University Logo" 
            style={styles.logo} 
            onClick={() => window.location.href = "https://rvu.edu.in/"}
          />
          <h1 style={styles.title}>Welcome to RV University ERP</h1>
        </div>
        
        {!isLoggedIn ? (
          <div style={styles.loginContainer}>
            {error && <p style={styles.error}>{error}</p>}
            <GoogleLogin 
              onSuccess={handleSuccess} 
              onError={handleFailure} 
              theme="filled_blue" 
              size="large"
              style={styles.googleButton}
            />
          </div>
        ) : (
          <div style={styles.dashboardContainer}>
            <h2 style={styles.welcomeText}>Hello, {user.name}!</h2>
            <p style={styles.email}>{user.email}</p>
            <button style={styles.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #D4AF37, #003366)',  // Gold and Dark Blue gradient
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    animation: 'fadeIn 1.5s ease-out',
  },
  logo: {
    cursor: 'pointer',
    width: '180px',
    marginBottom: '20px',
    transition: 'transform 0.3s',
  },
  logoHover: {
    transform: 'scale(1.1)',
  },
  header: {
    marginBottom: '50px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
    borderRadius: '10px',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    margin: '0',
    letterSpacing: '2px',
    textTransform: 'uppercase',
  },
  loginContainer: {
    marginTop: '20px',
    animation: 'slideIn 1s ease-out',
  },
  error: {
    color: '#f44336',
    fontSize: '1rem',
    marginBottom: '15px',
  },
  dashboardContainer: {
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: '2rem',
    marginBottom: '20px',
    animation: 'bounceIn 1.5s ease-out',
  },
  email: {
    fontSize: '1.2rem',
    color: '#ddd',
    marginBottom: '20px',
  },
  googleButton: {
    backgroundColor: '#4285F4',
    color: '#fff',
    borderRadius: '5px',
    padding: '12px 30px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    border: 'none',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
    transition: 'background-color 0.3s, transform 0.2s',
  },
  logoutButton: {
    marginTop: '20px',
    padding: '12px 25px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#e74c3c',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
    transition: 'background-color 0.3s, transform 0.2s',
  },
};

export default App;
