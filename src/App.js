import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

// Simulated Authentication State
let isAuthenticated = false; // This will simulate the user's authentication status

const clientId = "413792080053-i5gc4eg3lv5c8fotvpnof8g9coj068f1.apps.googleusercontent.com"; // Replace with your Google OAuth client ID

// Login Component
const Login = () => {
  const navigate = useNavigate();

  const handleGoogleSuccess = (response) => {
    const user = JSON.parse(atob(response.credential.split(".")[1])); // Decode the JWT token
    console.log('Login Success:', user); // Debugging purpose
    isAuthenticated = true; // Update the simulated authentication state
    navigate('/dashboard'); // Redirect to Dashboard after successful login
  };

  const handleGoogleFailure = (error) => {
    console.error('Login Failed:', error);
    alert('Login failed. Please try again.');
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div
        style={{
          height: '100vh',
          backgroundColor: '#000000',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          color: '#FFFFFF',
          fontFamily: '"Poppins", sans-serif',
          flexDirection: 'column',
        }}
      >
        <img
          src="rvu-logo.png"
          alt="RV University Logo"
          style={{
            width: '250px',
            height: '150px',
            marginBottom: '20px',
          }}
        />
        <header style={{ marginBottom: '20px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', margin: '0px', color: '#FFD700' }}>
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
            backgroundColor: '#f1c40f',
            color: '#000',
            fontWeight: 'bold',
            border: 'none',
          }}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

// Dashboard Component
const Dashboard = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        color: '#333',
        fontFamily: '"Poppins", sans-serif',
      }}
    >
      <h1>Welcome to the Dashboard!</h1>
    </div>
  );
};

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return element;
};

// App Component with Routing
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
