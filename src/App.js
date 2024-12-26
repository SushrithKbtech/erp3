import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import rvuLogo from './rvu-logo.png'; // Your RV logo
import rvuBackground from './stud.jpg'; // Your background image

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
        <div style={styles.leftSection}>
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
        <div style={styles.rightSection}>
          <div style={styles.overlay}>
            <img src={rvuLogo} alt="RV University Logo" style={styles.logo} />
            <div style={styles.admissionsText}>
              <h2 style={styles.subtitle}>New-Age Global University for Liberal Education</h2>
              <h1 style={styles.title}>ADMISSIONS OPEN 2025</h1>
              <p style={styles.description}>For all programmes</p>
              <button style={styles.applyButton}>Apply Now</button>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    backgroundImage: `url(${rvuBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  leftSection: {
    flex: 1.5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #003366, #D4AF37)',
  },
  box: {
    width: '350px',
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '15px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  rightSection: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  overlay: {
    textAlign: 'center',
    color: '#fff',
    padding: '20px',
  },
  logo: {
    width: '120px',
    marginBottom: '20px',
  },
  admissionsText: {
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '1.2rem',
    marginBottom: '10px',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  description: {
    fontSize: '1rem',
    marginBottom: '20px',
  },
  applyButton: {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#D4AF37',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  welcomeText: {
    fontSize: '1.5rem',
    color: '#003366',
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
};

export default App;
