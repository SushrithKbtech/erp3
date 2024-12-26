import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

// Dummy Dashboard Component
const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/'); // Redirect to login
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to the Dashboard!</h1>
      <button onClick={handleLogout} style={styles.button}>
        Logout
      </button>
    </div>
  );
};

// Main App Component
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const navigate = useNavigate();

  // Handle Google Login Success
  const handleSuccess = (response) => {
    try {
      const decodedToken = JSON.parse(atob(response.credential.split('.')[1]));
      console.log('User logged in:', decodedToken);
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true'); // Persist login
      navigate('/Dashboard'); // Redirect to Dashboard
    } catch (error) {
      console.error('Failed to decode token:', error);
    }
  };

  // Handle Google Login Failure
  const handleFailure = () => {
    alert('Failed to log in. Please try again.');
  };

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    return isAuthenticated ? children : <Navigate to="/" />;
  };

  useEffect(() => {
    // Sync state with localStorage
    setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
  }, []);

  return (
    <GoogleOAuthProvider clientId="413792080053-i5gc4eg3lv5c8fotvpnof8g9coj068f1.apps.googleusercontent.com">
      <Routes>
        {/* Login Page */}
        <Route
          path="/"
          element={
            <div style={styles.container}>
              <div style={styles.box}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/a/af/University_logo_example.png"
                  alt="RVU Logo"
                  style={styles.logo}
                  onClick={() => (window.location.href = 'https://rvu.edu.in/')}
                />
                <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
              </div>
            </div>
          }
        />

        {/* Dashboard Route (Protected) */}
        <Route
          path="/Dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </GoogleOAuthProvider>
  );
};

// CSS Styles
const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url("https://via.placeholder.com/1200x800")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'overlay',
  },
  box: {
    width: '400px',
    padding: '30px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '15px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  logo: {
    width: '150px',
    marginBottom: '20px',
    cursor: 'pointer',
    transition: 'transform 0.3s',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default () => (
  <Router>
    <App />
  </Router>
);
