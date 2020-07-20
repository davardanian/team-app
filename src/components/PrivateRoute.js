/* eslint-disable no-shadow */
import React from 'react';

import { Route, Redirect } from 'react-router-dom';

import { client } from './client';

const PrivateRoute = ({ component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      client.isLoggedIn() ? (
        React.createElement(component, props)
      ) : (
        <Redirect
          to={{
            pathname: '/user/login',
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
