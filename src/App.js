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
