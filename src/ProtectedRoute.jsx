import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, children }) => {
  // Debugging to ensure the value of isAuthenticated
  console.log('ProtectedRoute: isAuthenticated =', isAuthenticated);

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If authenticated, render the child components
  return children;
};

export default ProtectedRoute;
