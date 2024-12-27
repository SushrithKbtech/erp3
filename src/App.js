import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import "./App.css";
import "./upstyle.css";

// Simulated Authentication State
let isAuthenticated = false;

const clientId = "413792080053-i5gc4eg3lv5c8fotvpnof8g9coj068f1.apps.googleusercontent.com"; // Replace with your Google OAuth client ID

// Login Component
const Login = () => {
  const navigate = useNavigate();

  const handleGoogleSuccess = (response) => {
    const user = JSON.parse(atob(response.credential.split(".")[1]));
    console.log("Login Success:", user);

    // Extract user details
    const email = user.email;
    const name = user.name;
    const picture = user.picture || "https://via.placeholder.com/50";
    const [namePart] = email.split("@");
    const parts = namePart.split(".");
    let course = "Unknown";
    let yearOfJoining = "Unknown";

    // Identify the course and year
    if (parts.length >= 2) {
      const possibleCourse = parts[1];
      const possibleYear = parts[1].slice(-2);
      const validCourses = ["btech", "bsc", "bda"];
      if (validCourses.includes(possibleCourse.slice(0, -2).toLowerCase())) {
        course = possibleCourse.slice(0, -2).toUpperCase();
        yearOfJoining = `20${possibleYear}`;
      }
    }

    isAuthenticated = true;
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem(
      "userDetails",
      JSON.stringify({
        name,
        email,
        picture,
        course,
        yearOfJoining,
      })
    );

    navigate("/dashboard");
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
        <a href="https://rvu.edu.in" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block' }}>
  <img
    src="https://rvu.edu.in/wp-content/themes/rvu/images/rvu-logo.png"
    alt="RV University Logo"
    style={{
      width: "250px",
      height: "150px",
      marginBottom: "20px",
      transition: "transform 0.3s ease, filter 0.3s ease", // Smooth animation
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "scale(1.1)"; // Slightly enlarge
      e.currentTarget.style.filter = "brightness(1.2)"; // Brighten the image
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "scale(1)"; // Reset size
      e.currentTarget.style.filter = "brightness(1)"; // Reset brightness
    }}
  />
</a>
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
  const [userDetails, setUserDetails] = useState({ name: "", email: "", course: "", yearOfJoining: "", picture: "" });

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/"); // Redirect to login if not authenticated
    }

    const storedDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (storedDetails) {
      setUserDetails(storedDetails);
    }
  }, [navigate]);

  return (
    <div>
      <header className="header">
        <nav className="nav">
        <a href="https://rvu.edu.in" target="_blank" rel="noopener noreferrer">
          <img
            src="https://rvu.edu.in/wp-content/themes/rvu/images/rvu-logo.png"
            alt="RV University Logo"
            className="nav__logo"
          />
          </a>
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
            <li className="nav__item profile-container">
              <img
                src={userDetails.picture}
                alt="User Profile"
                className="profile-picture"
              />
              <div className="profile-hover">
                <p><strong>Name:</strong> {userDetails.name}</p>
                <p><strong>Email:</strong> {userDetails.email}</p>
                <p><strong>Course:</strong> {userDetails.course}</p>
                <p><strong>Year of Joining:</strong> {userDetails.yearOfJoining}</p>
                <button
                  className="logout-button"
                  onClick={() => {
                    localStorage.clear();
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </div>
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
            <h2 className="section__description">Features</h2>
            <h3 className="section__header">Explore your advanced functionalities</h3>
          </div>
        </section>
      </main>
    </div>
  );
};

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return element;
};

// App Component
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
