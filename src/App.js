import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import "./App.css"; // For login
import "./upstyle.css"; // For dashboard

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
      <div className="login-container">
        <img
          src="https://www.google.com/url?sa=i&url=https%3A%2F%2Frvu.edu.in%2Frvu-at-a-glance%2F&psig=AOvVaw1p6XLi-tSbbSrwlw2B46nm&ust=1735408771825000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCID7kc3DyIoDFQAAAAAdAAAAABAE"
          alt="RV University Logo"
          className="login-logo"
        />
        <header>
          <h1>Welcome to RV University Portal</h1>
          <p>Please log in with your Google account to continue.</p>
        </header>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleFailure}
          theme="outline"
          shape="pill"
          text="Login with Google"
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
    <div className="dashboard-container">
      <header className="header">
        <nav className="nav">
          <img
            src="/static/images/logo.png"
            alt="RV University Logo"
            className="nav__logo"
          />
          <ul className="nav__links">
            <li className="nav__item">
              <a className="nav__link" href="/clubchat">
                Club Chat
              </a>
            </li>
            <li className="nav__item">
              <a className="nav__link" href="/view_files">
                View Uploads
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
                  isAuthenticated = false; // Clear authentication
                }}
              >
                Logout
              </a>
            </li>
          </ul>
        </nav>

        <div className="header__title">
          <h1>Where Knowledge Meets Opportunity</h1>
          <h4>A transformative data collection tool for a smoother experience.</h4>
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
              <h5>Club Chat</h5>
              <p>Connect and collaborate with your peers.</p>
            </div>
            <div className="features__feature">
              <h5>Upload Portfolio</h5>
              <p>Showcase your achievements in a professional format.</p>
            </div>
            <div className="features__feature">
              <h5>View Uploads</h5>
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
