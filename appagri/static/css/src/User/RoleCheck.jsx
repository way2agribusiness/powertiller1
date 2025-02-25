import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const RoleCheck = ({ allowedRoles, children }) => {
  const { auth } = useAuth();
  const role = auth.userData?.role;

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />; 
  }

  return children; 
};

export default RoleCheck;
