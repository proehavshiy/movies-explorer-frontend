/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ path, loggedIn, children }) => (
  <Route exact path={path}>
    {
      () => (loggedIn ? children : <Redirect to="/" />)
    }
  </Route>
);

export default ProtectedRoute;
