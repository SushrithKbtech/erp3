import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import logo from './rvu-logo.png'; // Import the logo

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const clientId = 'YOUR_GOOGLE_CLIENT_ID'; // Replace with your OAuth Client ID

  const handleSuccess = (response) => {
    const decodedToken = JSON.parse(atob(response.credential.split('.')[1]));
    setUser(decodedToken); // Save user info
    setIsLoggedIn(true); // Set login state
    setError(null); // Clear any previous errors
  };

  const handleFailure = () => {
    alert('Failed to log in. Please try again.');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setError(null);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div style={styles.container}>
        <img src={logo} alt="RV University Logo" style={styles.logo} />
        <h1 style={styles.title}>Welcome to RV University</h1>
        {!isLoggedIn ? (
          <div>
            <p style={styles.subtitle}>
              Please log in with your Google account
            </p>
            {error && <p style={styles.error}>{error}</p>}
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={handleFailure}
            />
          </div>
        ) : (
          <div>
            <p style={styles.subtitle}>Hello, {user.name}!</p>
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
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
    color: '#fff',
    textAlign: 'center',
  },
  logo: {
    width: '150px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    margin: 0,
  },
  subtitle: {
    fontSize: '1.5rem',
    margin: '10px 0',
    fontWeight: 'lighter',
  },
  email: {
    fontSize: '1rem',
    color: '#ddd',
  },
  error: {
    color: '#ff6b6b',
    fontSize: '1rem',
    marginBottom: '20px',
  },
  logoutButton: {
    marginTop: '20px',
    padding: '10px 20px',
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
