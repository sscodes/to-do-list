import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = JSON.parse(localStorage.getItem('auth'))?.token;

  return token ? children : <Navigate to={'/'} />;
};

export default PrivateRoute;
