import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import "./App.css"; // For login styling
import "./upstyle.css"; // For dashboard and other page styling

const clientId = "413792080053-i5gc4eg3lv5c8fotvpnof8g9coj068f1.apps.googleusercontent.com"; // Replace with your Google OAuth client ID

// Simulated Authentication State
let isAuthenticated = false;

// Login Component
const Login = () => {
  const navigate = useNavigate();

  const handleGoogleSuccess = (response) => {
    const user = JSON.parse(atob(response.credential.split(".")[1])); // Decode the JWT token
    console.log("Login Success:", user); // Debugging purpose
    isAuthenticated = true; // Update the simulated authentication state
    localStorage.setItem("isAuthenticated", true); // Save authentication status
    navigate("/dashboard"); // Redirect to Dashboard after successful login
  };

  const handleGoogleFailure = (error) => {
    console.error("Login Failed:", error);
    alert("Login failed. Please try again.");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="login-container">
        <div className="login-box">
          <img
            src="/rvu-logo.png"
            alt="RV University Logo"
            className="logo"
          />
          <h1>Welcome to RV University Portal</h1>
          <p>Log in with your Google account to continue.</p>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            theme="outline"
            shape="pill"
          />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

// Dashboard Component
const Dashboard = () => {
  const navigate = useNavigate();

  // Redirect to login if the user is not authenticated
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (!authStatus) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "./upscript.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="dashboard-container">
      <header className="header">
        <nav className="nav">
          <img
            src="/rvu-logo.png"
            alt="RV University Logo"
            className="nav__logo"
          />
          <ul className="nav__links">
            <li>
              <a href="/clubchat">Club Chat</a>
            </li>
            <li>
              <a href="/view_files">View Uploads</a>
            </li>
            <li>
              <a href="/upload">Upload Portfolio</a>
            </li>
            <li>
              <a
                href="/"
                onClick={() => {
                  localStorage.removeItem("isAuthenticated");
                  navigate("/");
                }}
              >
                Logout
              </a>
            </li>
          </ul>
        </nav>
        <div className="header__title">
          <h1>Welcome to Your Dashboard</h1>
        </div>
      </header>
    </div>
  );
};

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  const authStatus = localStorage.getItem("isAuthenticated");
  return authStatus ? element : <Navigate to="/" replace />;
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
        <Route
          path="/clubchat"
          element={<ProtectedRoute element={<div>Club Chat Page</div>} />}
        />
        <Route
          path="/view_files"
          element={<ProtectedRoute element={<div>View Files Page</div>} />}
        />
        <Route
          path="/upload"
          element={<ProtectedRoute element={<div>Upload Portfolio Page</div>} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
