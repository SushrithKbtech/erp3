import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import "./app.css"; // CSS for Login
import "./upstyle.css"; // CSS for Dashboard

// Simulated Authentication
let isAuthenticated = false; // Replace with actual authentication logic

const clientId = "YOUR_CLIENT_ID"; // Replace with your Google OAuth client ID

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
      <div className="login-container">
        <div className="login-box">
          <img
            src="rvu-logo.png"
            alt="RV University Logo"
            className="login-logo"
          />
          <h1 className="login-heading">Welcome to RV University Portal</h1>
          <p className="login-subtext">Please log in with your Google account to continue.</p>
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
    <div className="dashboard">
      <header className="header">
        <nav className="nav">
          <img
            src="/static/images/logo.png"
            alt="RV University Logo"
            className="nav__logo"
          />
          <ul className="nav__links">
            <li className="nav__item">
              <a className="nav__link" href="/clubchat">Club Chat</a>
            </li>
            <li className="nav__item">
              <a className="nav__link" href="/view_files">View Uploads</a>
            </li>
            <li className="nav__item">
              <a className="nav__link" href="/upload">Upload Portfolio</a>
            </li>
            <li className="nav__item">
              <a className="nav__link nav__link--profile" href="/">
                Logout
              </a>
            </li>
          </ul>
        </nav>

        <div className="header__title">
          <h1 className="dashboard-heading">Where <span className="highlight">knowledge</span> meets <span className="highlight">opportunity</span></h1>
          <p className="dashboard-subheading">A transformative data collection tool for a smoother experience.</p>
        </div>
      </header>

      <main>
        <section className="section">
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
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
      </Routes>
    </Router>
  );
};

export default App;
