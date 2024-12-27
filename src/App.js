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
        style={{
          height: '100vh',
          backgroundColor: '#000000', // Fully dark black background
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          color: '#FFFFFF', // White text color
          fontFamily: '"Poppins", sans-serif', // Stylish and professional font
          flexDirection: 'column',
        }}
      >
        <img
          src="/path-to-logo/logo.png" // Update with the correct path
          alt="RV University Logo"
          style={{
            width: '250px',
            height: '150px',
            marginBottom: '20px',
          }}
        />
        <header style={{ marginBottom: '20px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', margin: '0px', color: '#B8860B' }}>
            Welcome to RV University Portal
          </h1>
          <p style={{ fontSize: '1.5rem', margin: '10px 0px', fontWeight: 100 }}>
            Please log in with your Google account to continue.
          </p>
        </header>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleFailure}
          theme="outline"
          shape="pill"
          text="Login with Google"
          style={{
            fontSize: '1rem',
            padding: '10px 20px',
            borderRadius: '5px',
            backgroundColor: '#f1c40f', // Golden color
            color: '#000',
            fontWeight: 'bold',
            border: 'none',
          }}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;
