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
    <GoogleOAuthProvider clientId="413792080053-i5gc4eg3lv5c8fotvpnof8g9coj068f1.apps.googleusercontent.com">
      <div
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#0d0d0d', // Darker black background
        }}
      >
        <div
          className="form-container"
          style={{
            width: '300px', // Smaller width for the container
            padding: '20px',
            backgroundColor: '#1a1a1a', // Slightly lighter black than the background
            borderRadius: '10px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
          }}
        >
          <a href="https://rvu.edu.in" target="_blank" rel="noopener noreferrer">
            <img
              src="https://www.google.co.in/url?sa=i&url=https%3A%2F%2Frvu.edu.in%2Frvu-at-a-glance%2F&psig=AOvVaw3NM6X21zyBq6XrF0T3hc-n&ust=1735386785218000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKiuldjxx4oDFQAAAAAdAAAAABAE" // Update path as necessary
              alt="RV University Logo"
              className="logo"
              style={{
                display: 'block',
                margin: '0 auto',
                marginBottom: '20px',
                width: '120px',
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
                useOneTap
                text="Login with Google"
                width="100%"
                theme="outline"
                shape="pill"
              />
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;
