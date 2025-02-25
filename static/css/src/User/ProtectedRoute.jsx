import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();
  const location = useLocation();

  if (!auth.isAuthenticated) {
    // Redirect to login and include the intended destination in the state
    return <Navigate to="/login" state={{ redirectTo: location.pathname }} replace />;
  }

  return children; // If authenticated, render the children components
};

export default ProtectedRoute;
