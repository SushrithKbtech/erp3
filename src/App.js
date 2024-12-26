import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import rvuLogo from './rvu-logo.png'; // Your RV logo
import rvuBackground from './uni.jpg'; // Your background image

// Replace with your OAuth Client ID
const clientId = '413792080053-i5gc4eg3lv5c8fotvpnof8g9coj068f1.apps.googleusercontent.com';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleSuccess = (response) => {
    const decodedToken = JSON.parse(atob(response.credential.split('.')[1]));
    setUser(decodedToken);
    setIsLoggedIn(true);
  };

  const handleFailure = () => {
    alert('Failed to log in. Please try again.');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div style={styles.container}>
        {/* Central Box */}
        <div style={styles.box}>
          <img 
            src={rvuLogo} 
            alt="RV University Logo" 
            style={styles.logo}
            onClick={() => window.location.href = "https://rvu.edu.in/"} 
          />
          {!isLoggedIn ? (
            <GoogleLogin 
              onSuccess={handleSuccess} 
              onError={handleFailure} 
              theme="filled_blue" 
              size="large" 
            />
          ) : (
            <div style={styles.welcomeContainer}>
              <h2 style={styles.welcomeText}>Welcome Back, {user.name}!</h2>
              <button style={styles.logoutButton} onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
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
  welcomeContainer: {
    textAlign: 'center',
    color: '#003366',
  },
  welcomeText: {
    fontSize: '1.5rem',
    color: '#003366',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: '20px',
    padding: '12px 25px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
  },
};

export default App;
