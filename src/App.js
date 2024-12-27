import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';


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
          backgroundColor: '#000000', // Fully dark black background
        }}
      >
        <div
          className="form-container"
          style={{
            width: '280px', // Smaller width
            padding: '15px',
            backgroundColor: '#121212', // Darker shade for the container
            borderRadius: '8px',
            boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.5)',
          }}
        >
          <a href="https://rvu.edu.in" target="_blank" rel="noopener noreferrer">
            <img
              src="https://rvu.edu.in/wp-content/themes/rvu/images/footer_logo.svg" // Update path as necessary
              alt="RV University Logo"
              className="logo"
              style={{
                display: 'block',
                margin: '0 auto',
                marginBottom: '50px',
                width: '100px',
                filter: 'brightness(0) saturate(100%) invert(80%) sepia(76%) saturate(700%) hue-rotate(356deg) brightness(90%) contrast(90%)', // Golden color
              }}
            />
          </a>

          {/* Login Section */}
          <div id="loginSection" className="login-section">
            <div className="button-group" style={{ textAlign: 'center' }}>
              <button
                className="google-login-btn"
                style={{
                  width: '100%',
                  backgroundColor: '#f1c40f', // Golden color
                  color: '#000000',
                  fontWeight: 'bold',
                  padding: '12px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onClick={() => console.log('Google Login Triggered')}
              >
                Login with Google&nbsp;→
              </button>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;
