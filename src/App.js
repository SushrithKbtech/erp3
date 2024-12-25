import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

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
          <img 
            src="https://rvu.edu.in/wp-content/uploads/2020/12/RV-University-Logo.svg" 
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
    background: 'linear-gradient(135deg, #d4af37, #5d4037)',  // Gold and Brown gradient
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  logo: {
    cursor: 'pointer',
    width: '200px',
    marginBottom: '20px',
  },
  header: {
    marginBottom: '50px',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    margin: '0',
    letterSpacing: '2px',
  },
  loginContainer: {
    marginTop: '20px',
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
  },
  email: {
    fontSize: '1.2rem',
    color: '#ddd',
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
