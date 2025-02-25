import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const RoleBasedRedirect = () => {
  const { auth } = useAuth();
  const role = auth.userData?.role;

  switch (role) {
    case 'buyer':
      return <Navigate to="/dashboard-buyer" replace />; 
    case 'seller':
      return <Navigate to="/seller-dashboard" replace />; 
    case 'admin':
      return <Navigate to="/admin-dashboard" replace />; 
    default:
      return <Navigate to="/" replace />; 
  }
};

export default RoleBasedRedirect;
