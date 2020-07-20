import React, { Component } from 'react';
import { List, Segment, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import TopMenu from './TopMenu';

import { userReact } from '../actions/user';
import { getProjects } from '../actions/projects';
import { client } from './client';

class Projects extends Component {
  componentDidMount() {
    const token = client.getToken();
    this.props.getProjects(token);
  }

  onReactClick = (e) => {
    const token = client.getToken();

    if (e.target.getAttribute('class') === 'violet thumbs up icon') {
      this.props.userReact(true, e.target.id, token, 'projects');
    } else {
      this.props.userReact(false, e.target.id, token, 'projects');
    }
    let projectsUpdate = setTimeout(() => this.props.getProjects(token), 100); //Don`t know why, but works only with this way
    this.props.getProjects(token);
  };

  render() {
    const projects = this.props.projects.map((t) => (
      <List.Item key={t.id}>
        <List.Content floated='right'>
          <span
            id={t.id}
            style={{ color: 'white', marginRight: '50px', fontWeight: 'bold' }}
          >
            {t.votingsCount}
          </span>
          <Icon
            color='violet'
            onClick={this.onReactClick}
            id={t.id}
            disabled={this.props.isLoading}
            loading={this.props.isLoading}
            type={t.votedByMe ? 'thumbs down' : 'thumbs up'}
            name={
              this.props.isLoading
                ? 'spinner'
                : t.votedByMe
                ? 'thumbs down'
                : 'thumbs up'
            }
          ></Icon>
        </List.Content>
        <List.Header>{t.title}</List.Header>
        <List.Content>{t.description}</List.Content>
      </List.Item>
    ));

    return (
      <div>
        <TopMenu />
        <Segment
          inverted
          style={{ marginTop: '60px', marginLeft: '50px', maxWidth: '900px' }}
          vertical
        >
          <div style={{ display: 'flex' }}>
            <span style={{ color: 'white', fontSize: '40px' }}>
              {' '}
              our{' '}
              <span style={{ color: '#5530a7', fontSize: '50px' }}>
                projects
              </span>
            </span>
          </div>

          <List style={{ marginTop: '50px ' }} divided inverted relaxed>
            {projects}
          </List>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
    isLoading: state.itemsAreLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProjects: (token) => dispatch(getProjects(token)),

    userReact: (bool, id, token, category) =>
      dispatch(userReact(bool, id, token, category)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
