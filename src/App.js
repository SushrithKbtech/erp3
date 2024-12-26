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
          <h1 style={styles.welcomeText}>Welcome Back</h1>
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
        <div style={styles.rightSection}>
          <img src={rvuLogo} alt="RV University Logo" style={styles.logo} />
          <div style={styles.admissionsText}>
            <h2>New-Age Global University for Liberal Education</h2>
            <h1>ADMISSIONS OPEN 2025</h1>
            <p>For all programmes</p>
            <button style={styles.applyButton}>Apply Now</button>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'overlay',
  },
  leftSection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '20px',
    borderRadius: '10px',
    margin: '20px',
  },
  rightSection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    color: '#fff',
  },
  logo: {
    width: '150px',
    marginBottom: '20px',
  },
  admissionsText: {
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: '2rem',
    color: '#003366',
    marginBottom: '20px',
  },
  applyButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#D4AF37',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
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
