import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const clientId = '413792080053-i5gc4eg3lv5c8fotvpnof8g9coj068f1.apps.googleusercontent.com'; // Replace with your OAuth Client ID

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
        {!isLoggedIn ? (
          <div>
            <header style={styles.header}>
              <h1 style={styles.title}>Welcome to RV University</h1>
              <p style={styles.subtitle}>
                Please log in with your Google account to continue.
              </p>
            </header>
            {error && <p style={styles.error}>{error}</p>}
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={handleFailure}
            />
          </div>
        ) : (
          <div>
            <header style={styles.header}>
              <h1 style={styles.title}>Welcome to RV University</h1>
              <p style={styles.subtitle}>Hello, {user.name}!</p>
              <p style={styles.email}>{user.email}</p>
            </header>
            <button style={styles.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

// Inline styles for the app
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
  header: {
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
