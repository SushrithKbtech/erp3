import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const clientId = "413792080053-i5gc4eg3lv5c8fotvpnof8g9coj068f1.apps.googleusercontent.com"; // Replace with your Google OAuth client ID

// Authentication State
let isAuthenticated = false;

// Login Component
const Login = () => {
  const navigate = useNavigate();

  const handleGoogleSuccess = (response) => {
    const user = JSON.parse(atob(response.credential.split(".")[1])); // Decode the JWT token
    console.log("Login Success:", user); // Debugging purpose
    isAuthenticated = true; // Update authentication state
    navigate("/dashboard"); // Redirect to Dashboard
  };

  const handleGoogleFailure = (error) => {
    console.error("Login Failed:", error);
    alert("Login failed. Please try again.");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div
        style={{
          height: "100vh",
          backgroundColor: "#000000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "#FFFFFF",
          fontFamily: '"Poppins", sans-serif',
          flexDirection: "column",
        }}
      >
        <img
          src="rvu-logo.png"
          alt="RV University Logo"
          style={{
            width: "250px",
            height: "150px",
            marginBottom: "20px",
          }}
        />
        <header style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "3rem", fontWeight: "bold", margin: "0px", color: "#FFD700" }}>
            Welcome to RV University Portal
          </h1>
          <p style={{ fontSize: "1.5rem", margin: "10px 0px", fontWeight: 100 }}>
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
            fontSize: "1rem",
            padding: "10px 20px",
            borderRadius: "5px",
            backgroundColor: "#f1c40f",
            color: "#000",
            fontWeight: "bold",
            border: "none",
          }}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

// Dashboard Component
const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/"); // Redirect to login if not authenticated
    }
  }, [navigate]);

  return (
    <div>
      <header className="header">
        <nav className="nav">
          <img
            src="/static/images/logo.png"
            alt="RV University Logo"
            className="nav__logo"
            style={{ height: "5rem" }}
          />
          <ul className="nav__links">
            <li className="nav__item">
              <a className="nav__link" href="/clubchat">
                Club Chat
              </a>
            </li>
            <li className="nav__item">
              <a className="nav__link" href="/view_files">
                View uploads
              </a>
            </li>
            <li className="nav__item">
              <a className="nav__link" href="/upload">
                Upload Portfolio
              </a>
            </li>
            <li className="nav__item">
              <a
                className="nav__link nav__link--profile"
                href="/"
                onClick={() => {
                  isAuthenticated = false; // Clear user session
                  navigate("/");
                }}
              >
                Logout
              </a>
            </li>
          </ul>
        </nav>

        <div
          className="header__title"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
            position: "relative",
          }}
        >
          <h1>Welcome to Your Dashboard</h1>
        </div>
      </header>

      <main>
        <section className="section" id="section--1">
          <div className="section__title">
            <h2 className="section__description">Dashboard Overview</h2>
            <h3 className="section__header">Track your progress and activity</h3>
          </div>
        </section>

        <section>
          <p>Welcome to the dashboard! Here you can manage your activities.</p>
        </section>
      </main>
    </div>
  );
};

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  return isAuthenticated ? element : <Navigate to="/" replace />;
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
