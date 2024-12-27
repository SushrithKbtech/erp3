import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import "./App.css";
import "./upstyle.css";
// Simulated Authentication
let isAuthenticated = false; // Replace with actual authentication logic

const clientId = "413792080053-i5gc4eg3lv5c8fotvpnof8g9coj068f1.apps.googleusercontent.com"; // Replace with your Google OAuth client ID

// Login Component
const Login = () => {
  const navigate = useNavigate();

  const handleGoogleSuccess = (response) => {
    const user = JSON.parse(atob(response.credential.split(".")[1]));
    console.log("Login Success:", user);
    isAuthenticated = true; // Mark as authenticated
    navigate("/dashboard"); // Redirect to the dashboard
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
                  // Clear user session (if needed)
                  isAuthenticated = false;
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

      {/* Add your dashboard sections here */}
      <main>
        <section className="section" id="section--1">
          <div className="section__title">
            <h2 className="section__description">Features</h2>
            <h3 className="section__header">Explore our advanced functionalities</h3>
          </div>
          <div className="features">
            <div className="features__feature">
              <h4>Club Chat</h4>
              <p>Connect and collaborate with your peers.</p>
            </div>
            <div className="features__feature">
              <h4>Upload Portfolio</h4>
              <p>Showcase your achievements in a professional format.</p>
            </div>
            <div className="features__feature">
              <h4>View Uploads</h4>
              <p>Access and manage your uploaded files seamlessly.</p>
            </div>
          </div>
        </section>
      </main>
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
