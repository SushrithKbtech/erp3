import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import "./upstyle.css"; // Include the provided CSS file here

const clientId =
  "413792080053-i5gc4eg3lv5c8fotvpnof8g9coj068f1.apps.googleusercontent.com"; // Replace with your client ID

const useAuth = () => {
  const isAuthenticated = Boolean(localStorage.getItem("isAuthenticated"));
  const login = () => localStorage.setItem("isAuthenticated", "true");
  const logout = () => localStorage.removeItem("isAuthenticated");
  return { isAuthenticated, login, logout };
};

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSuccess = (response) => {
    console.log("Login Success:", response);
    login();
    navigate("/dashboard");
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
          <h1 className="login-header">Welcome to RV University Portal</h1>
          <p className="login-subtext">Log in with your Google account to continue.</p>
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

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("isAuthenticated")) {
      navigate("/");
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
              <a
                className="nav__link nav__link--profile"
                href="/"
                onClick={() => {
                  logout();
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

      <main>
        <section className="section">
          <div className="section__title">
            <h2 className="section__description">Dashboard Overview</h2>
            <h3 className="section__header">Manage your activities here</h3>
          </div>
          <div className="features">
            <div className="features__feature">
              <h5 className="features__header">Club Chat</h5>
              <p>Engage with your clubs and fellow members.</p>
              <a href="/clubchat" className="btn">Go to Club Chat</a>
            </div>
            <div className="features__feature">
              <h5 className="features__header">View Uploads</h5>
              <p>Access all your uploaded documents and projects.</p>
              <a href="/view_files" className="btn">View Files</a>
            </div>
            <div className="features__feature">
              <h5 className="features__header">Upload Portfolio</h5>
              <p>Submit your work and portfolio for review.</p>
              <a href="/upload" className="btn">Upload Now</a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/" replace />;
};

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
          element={<ProtectedRoute element={<h1>Club Chat</h1>} />}
        />
        <Route
          path="/view_files"
          element={<ProtectedRoute element={<h1>View Files</h1>} />}
        />
        <Route
          path="/upload"
          element={<ProtectedRoute element={<h1>Upload Portfolio</h1>} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
