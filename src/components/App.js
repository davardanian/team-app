import React, { Component, Fragment } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import LoginForm from './LoginForm';

import TopMenu from './TopMenu';
import RegisterForm from './RegisterForm';
import Account from './Account';
import PrivateRoute from './PrivateRoute';
import Topics from './Topics';
import HomepageHeading from './Homepage';
import Projects from './Projects';

class App extends Component {
  state = {};

  render() {
    return (
      <Switch>
        <PrivateRoute path='/user/account' component={Account} />
        <PrivateRoute path='/user/topics' component={Topics} />
        <PrivateRoute path='/user/projects' component={Projects} />
        <Route path={'/user/login'} component={LoginForm} />
        <Route path={'/user/register'} component={RegisterForm} />
        <Route
          path={'/'}
          render={(props) => (
            <Fragment>
              <TopMenu />
              <HomepageHeading />
            </Fragment>
          )}
        />
      </Switch>
    );
  }
}

export default App;
