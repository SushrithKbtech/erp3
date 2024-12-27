import React from 'react';
import { GoogleLogin } from 'react-google-login';

const App = () => {
  const handleSuccess = (response) => {
    console.log('Login Success:', response.profileObj);
    // Handle user data and token here
  };

  const handleFailure = (response) => {
    console.error('Login Failed:', response);
  };

  return (
    <div
      className="container"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#1a1a1a',
      }}
    >
      <div
        className="form-container"
        style={{
          width: '400px',
          padding: '20px',
          backgroundColor: '#fff',
          borderRadius: '10px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        <a href="https://rvu.edu.in" target="_blank" rel="noopener noreferrer">
          <img
            src="/static/images/logo.png"
            alt="RV University Logo"
            className="logo"
            style={{
              display: 'block',
              margin: '0 auto',
              marginBottom: '20px',
              width: '100px',
            }}
          />
        </a>

        <div id="loginSection" className="login-section">
          <div
            className="button-group"
            style={{ marginBottom: '20px', textAlign: 'center' }}
          >
            <GoogleLogin
              clientId="YOUR_CLIENT_ID"
              buttonText="Login with Google"
              onSuccess={handleSuccess}
              onFailure={handleFailure}
              cookiePolicy={'single_host_origin'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
