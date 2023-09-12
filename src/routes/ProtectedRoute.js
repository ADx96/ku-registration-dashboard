import React from 'react';
import { Navigate } from 'react-router-dom';
import authApi from 'src/api/authApi';
import { useGetUserData } from 'src/hooks/useLogin';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { data, isLoading } = useGetUserData();

  const { isAuthenticated } = authApi;

  const isAllowed =
    (!isLoading && data.role.name === allowedRoles) || allowedRoles === 'any';

  return isAuthenticated() && isAllowed ? (
    children
  ) : (
    <Navigate to='/' replace />
  );
};

export default ProtectedRoute;
