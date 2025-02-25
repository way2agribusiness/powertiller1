import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const PublicRoute = ({ children }) => {
  const { auth } = useAuth();
  const location = useLocation();

  
  const redirectTo = location.state?.redirectTo || '/dashboard';

  if (auth.isAuthenticated) {
    return <Navigate to={redirectTo} replace />; 
  }

  return children; 
};

export default PublicRoute;
