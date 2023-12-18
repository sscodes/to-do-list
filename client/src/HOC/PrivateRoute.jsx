import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = useSelector((state) => state?.user?.user?.token);
  return token ? children : <Navigate to={'/'} />;
};

export default PrivateRoute;
