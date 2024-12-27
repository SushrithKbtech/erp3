import React from 'react';
import './styles.css';

const App = () => {
  const handleGoogleLogin = () => {
    // Logic for Google Login
    console.log('Google Login triggered');
    // Redirect to Google authentication URL or handle login functionality here
  };

  return (
    <div className="container">
      <div className="form-container">
        <a href="https://rvu.edu.in" target="_blank" rel="noopener noreferrer">
          <img
            src="/static/images/logo.png" // Update path as necessary
            alt="RV University Logo"
            className="logo"
          />
        </a>

        {/* Login Section */}
        <div id="loginSection" className="login-section">
          <div className="button-group">
            <button className="btn active">Login</button>
          </div>

          <div className="form">
            <button className="google-login-btn" onClick={handleGoogleLogin}>
              <i className="fab fa-google"></i> Login with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
