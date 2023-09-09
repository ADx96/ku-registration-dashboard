import React from 'react';
import { Navigate } from 'react-router-dom';
import authApi from 'src/api/authApi';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = authApi;

  return isAuthenticated() ? <Navigate to='/dashboard' replace /> : children;
};

export default PrivateRoute;
