import React from 'react';
import { Navigate } from 'react-router-dom';
import authApi from 'src/api/authApi';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = authApi;

  return isAuthenticated() ? children : <Navigate to='/' replace />;
};

export default ProtectedRoute;
