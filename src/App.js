import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import './styles.css';

const App = () => {
  const handleGoogleSuccess = (response) => {
    console.log('Login Success:', response);
    // Handle user data and token here
  };

  const handleGoogleFailure = (error) => {
    console.error('Login Failed:', error);
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_CLIENT_ID">
      <div
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#000000', // Full dark black background
        }}
      >
        <div
          className="form-container"
          style={{
            width: '350px',
            padding: '20px',
            backgroundColor: '#1a1a1a', // Slightly lighter black than the background
            borderRadius: '10px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          <a href="https://rvu.edu.in" target="_blank" rel="noopener noreferrer">
            <img
              src="/static/images/logo.png" // Update path as necessary
              alt="RV University Logo"
              className="logo"
              style={{
                display: 'block',
                margin: '0 auto',
                marginBottom: '20px',
                width: '100px',
                filter: 'brightness(0) saturate(100%) invert(77%) sepia(73%) saturate(368%) hue-rotate(356deg) brightness(95%) contrast(85%)', // Golden color
              }}
            />
          </a>

          {/* Login Section */}
          <div id="loginSection" className="login-section">
            <div className="button-group" style={{ marginBottom: '20px', textAlign: 'center' }}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
                text="Login with Google"
                theme="filled_black"
                style={{
                  backgroundColor: '#f1c40f', // Golden color
                  color: '#000',
                  fontWeight: 'bold',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;
