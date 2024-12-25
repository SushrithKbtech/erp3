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
          <img src="/logo.png" alt="RV University Logo" className="logo" />
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

// Inline CSS styling for the app
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #4b6cb7, #182848)', // RV University-like color gradient
    color: '#fff',
    textAlign: 'center',
  },
  logo: {
    width: '150px',
    marginBottom: '40px',
    cursor: 'pointer',
  },
  header: {
    marginBottom: '20px',
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#ffcc00', // RV University yellow
  },
  subtitle: {
    fontSize: '1.5rem',
    color: '#f4f4f4',
    fontWeight: 'lighter',
  },
  error: {
    color: '#ff6b6b',
    fontSize: '1rem',
    marginBottom: '20px',
  },
  loginBox: {
    padding: '40px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: '15px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
  },
  googleLogin: {
    background: '#ffcc00',
    color: '#fff',
    borderRadius: '5px',
    border: 'none',
    fontSize: '1.1rem',
    padding: '15px 40px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, background-color 0.3s ease',
  },
  googleLoginHover: {
    backgroundColor: '#f39c12',
    transform: 'scale(1.05)',
  },
  userInfo: {
    padding: '40px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: '15px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
  },
  email: {
    color: '#ddd',
    fontSize: '1.1rem',
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
    transition: 'background-color 0.3s, transform 0.2s',
  },
  logoutButtonHover: {
    backgroundColor: '#c0392b',
    transform: 'scale(1.05)',
  },
};
