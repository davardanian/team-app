import React, { Component, createRef } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { client } from './client';

import { connect } from 'react-redux';
import { Button, Container, Menu, Segment } from 'semantic-ui-react';
import { userLogout, userInfo } from '../actions/user';

/* eslint-disable react/no-multi-comp */

class TopMenu extends Component {
  state = { isLogged: client.isLoggedIn() };
  contextRef = createRef();

  onLogoutClick = (e) => {
    const token = client.getToken();

    this.props.logout(token);
    client.removeToken();
    console.log('Token = ' + token);
    this.setState({ isLogged: false });
    window.location.replace(window.location.origin);
  };

  componentDidMount() {
    console.log('MOUNTEd');
    if (this.state.isLogged) {
      const token = client.getToken();
      this.props.getInfo(token);
    }
  }

  render() {
    console.log('Logged  = ' + this.state.isLogged);
    console.log(this.props.user);
    return (
      <Segment
        inverted
        textAlign='center'
        style={{ maxHeight: 50, padding: '1em 0em' }}
        vertical
      >
        <Menu inverted pointing secondary size='large'>
          <Container>
            <Menu.Item as={Link} to={'/'} name='home' />
            <Menu.Item as={Link} to={'/user/topics'} name='topics' />
            <Menu.Item as={Link} to='/user/teams' name='teams' />
            <Menu.Item as={Link} to={'/user/projects'} name='projects' />
            <Menu.Item position='right'>
              <Button
                style={{
                  marginLeft: '0.5em',
                  display: this.state.isLogged ? 'none' : '',
                }}
                as={Link}
                to={'/user/login'}
                inverted
              >
                Log in
              </Button>
              <Button
                as={Link}
                color='violet'
                to={'/user/register'}
                style={{
                  marginLeft: '0.5em',
                  display: this.state.isLogged ? 'none' : '',
                }}
                inverted
              >
                Sign Up
              </Button>
              <span
                inverted
                style={{
                  marginLeft: '0.7em',
                  fontWeight: 'bold',
                  fontSize: '120%',
                  display: this.state.isLogged ? '' : 'none',
                }}
              >
                Welcome ,{' '}
                <Link
                  style={{ color: '#5530a7', fontSize: '150%' }}
                  to={'/user/account'}
                >
                  {this.props.user.firstName}
                </Link>
              </span>
              <Button
                as='a'
                style={{
                  marginLeft: '3em',
                  display: this.state.isLogged ? '' : 'none',
                }}
                inverted
                onClick={this.onLogoutClick}
              >
                Log Out
              </Button>
            </Menu.Item>
          </Container>
        </Menu>
      </Segment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: (token) => dispatch(userLogout(token)),
    getInfo: (token) => dispatch(userInfo(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);
