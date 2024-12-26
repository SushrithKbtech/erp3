import React from 'react';
import { GoogleLogin } from 'react-google-login'; // Install this package using `npm install react-google-login`
import './styles.css';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();

  const onSuccess = (response) => {
    console.log('Login Success:', response.profileObj);
    // Redirect to dashboard
    navigate('/dashboard');
  };

  const onFailure = (response) => {
    console.error('Login Failed:', response);
    alert('Failed to log in. Please try again.');
  };

  return (
    <div className="container">
      <div className="form-container">
        <a href="https://rvu.edu.in" target="_blank" rel="noopener noreferrer">
          <img src="/static/images/logo.png" alt="RV University Logo" className="logo" />
        </a>
        <div className="login-section">
          <h2>Welcome Back</h2>
          <p>Login to access your portal</p>
          <div className="input-group">
            <GoogleLogin
              clientId="YOUR_GOOGLE_CLIENT_ID" // Replace with your Google OAuth Client ID
              buttonText="Sign in with Google"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={'single_host_origin'}
              className="google-login-btn"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
