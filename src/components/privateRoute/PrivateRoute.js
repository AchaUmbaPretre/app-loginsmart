import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const accessToken = useSelector((state) => state.auth.accessToken);

  // Si l'utilisateur est authentifié, il accède à la route, sinon on le redirige vers /login
  return accessToken ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
