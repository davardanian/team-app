import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userLogin } from '../actions/user';

import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from 'semantic-ui-react';

import './LoginForm.css';

class LoginForm extends Component {
  state = {
    email: '',
    pass: '',
    redirect: false,
    loginError: 'false',
  };

  userLogin = () => {
    this.props.login(this.state.email, this.state.pass);
  };

  render() {
    return (
      <div className='LoginForm'>
        <Grid textAlign='center' verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' style={{ color: 'white' }} textAlign='center'>
              Log-in to your account
            </Header>
            <Form size='large'>
              <Segment inverted stacked>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='E-mail address'
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  onChange={(e) => this.setState({ pass: e.target.value })}
                />

                <Button
                  basic
                  color='violet'
                  fluid
                  size='large'
                  onClick={this.userLogin}
                >
                  Login
                </Button>
                <span
                  style={{ color: 'green' }}
                  hidden={!this.props.loginError}
                >
                  {' '}
                  Error, Try Again
                </span>
              </Segment>
            </Form>
            <Message>
              New to us? <Link to={'/user/register'}>Sign Up</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    loginError: state.loginError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, pass) => dispatch(userLogin(email, pass)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
