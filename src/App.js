import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import rvuLogo from './rvu-logo.png'; // Your RV logo
import rvuBackground from './rvuni.png'; // Your background image

const clientId = '413792080053-i5gc4eg3lv5c8fotvpnof8g9coj068f1.apps.googleusercontent.com';

function LoginPage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleSuccess = (response) => {
    const decodedToken = JSON.parse(atob(response.credential.split('.')[1]));
    setUser(decodedToken);
    setIsLoggedIn(true);
    navigate('/dashboard'); // Navigate to the Dashboard page
  };

  const handleFailure = () => {
    alert('Failed to log in. Please try again.');
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div style={styles.container}>
        <div style={styles.box}>
          <img
            src={rvuLogo}
            alt="RV University Logo"
            style={styles.logo}
            onClick={() => window.location.href = "https://rvu.edu.in/"}
          />
          {!isLoggedIn && (
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={handleFailure}
              theme="filled_blue"
              size="large"
            />
          )}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

function Dashboard() {
  return (
    <div style={styles.dashboard}>
      <h1>Dashboard</h1>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
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
  dashboard: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    color: 'white',
    fontSize: '3rem',
    fontWeight: 'bold',
  },
};

export default App;
