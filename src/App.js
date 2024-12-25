import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import rvuLogo from './rvu-logo.png';  // Your RV logo
import rvuBackground from './rvuni.png';  // Your background image

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
        {/* Left Side */}
        <div style={styles.leftSide}>
          {/* RV University Logo */}
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
              style={styles.googleButton}
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

        {/* Right Side */}
        <div style={styles.rightSide}>
          <h1 style={styles.welcomeTextRight}>Welcome Back</h1>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #003366, #D4AF37)',  // Gold and Dark Blue gradient
  },
  leftSide: {
    width: '40%',
    backgroundColor: '#fff',  // Plain white background
    padding: '20px',
    textAlign: 'center',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  rightSide: {
    width: '60%',
    backgroundImage: `url(${rvuBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,  // Translucent effect for the background
    borderRadius: '10px',
  },
  logo: {
    width: '150px',
    marginBottom: '20px',
    cursor: 'pointer',
    transition: 'transform 0.3s',
  },
  googleButton: {
    backgroundColor: '#D4AF37', // Golden color for Google button
    color: '#fff',
    padding: '12px 30px',
    fontSize: '1.2rem',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    marginTop: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
    transition: 'background-color 0.3s, transform 0.2s',
  },
  welcomeContainer: {
    textAlign: 'center',
    color: '#003366',
  },
  welcomeText: {
    fontSize: '2.5rem',
    color: '#003366',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  welcomeTextRight: {
    fontSize: '4rem', // Larger text for "Welcome Back"
    color: '#fff', // Fully opaque
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
