import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

// Main App Component
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
      <div className="container">
        {/* Logo that redirects to the RV University website */}
        <a href="https://rvu.edu.in/" target="_blank" rel="noopener noreferrer">
          <img src="rvu-logo.png" alt="RV University Logo" className="logo" />
        </a>

        {!isLoggedIn ? (
          <div className="login-box">
            <header className="header">
              <h1 className="title">Welcome to RV University</h1>
              <p className="subtitle">Please log in with your Google account</p>
            </header>
            {error && <p className="error">{error}</p>}
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={handleFailure}
              useOneTap
              theme="outline" // Style the button as outlined
            />
          </div>
        ) : (
          <div className="user-info">
            <header className="header">
              <h1 className="title">Welcome to RV University</h1>
              <p className="subtitle">Hello, {user.name}!</p>
              <p className="email">{user.email}</p>
            </header>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;

// Inline CSS Styles
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
    width: '200px',
    marginBottom: '20px',
    cursor: 'pointer',
  },
  loginBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(0, 0, 0, 0.7)',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    margin: '20px 0',
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
  error: {
    color: '#ff6b6b',
    fontSize: '1rem',
    marginBottom: '20px',
  },
  userInfo: {
    padding: '20px',
    background: 'rgba(0, 0, 0, 0.7)',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
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

// Apply the styles to the document
Object.assign(document.body.style, styles.container);
