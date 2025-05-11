import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute = ({ children }: PrivateRouteProps): React.ReactElement => {
  const token = JSON.parse(localStorage.getItem('auth') as string)?.token;

  return token ? children : <Navigate to={'/'} />;
};

export default PrivateRoute;
