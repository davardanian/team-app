import React, { Component } from 'react';
import { List, Segment, Icon, Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import TopMenu from './TopMenu';
import { getTopics, addTopics, deleteTopics } from '../actions/topics';
import { userReact } from '../actions/user';
import { client } from './client';

class Topics extends Component {
  state = {
    topic: '',
    error: false,
  };

  componentDidMount() {
    const token = client.getToken();
    this.props.getTopics(token);
    let topicsUpdate = setInterval(() => this.props.getTopics(token), 5000); //Updating list every 5 secs
  }

  onAddClick = (e) => {
    if (this.state.topic === '') {
      this.setState({ error: true });
      return null;
    }

    const token = client.getToken();
    this.props.addTopics(this.state.topic, token);

    const newState = {
      topic: '',
      error: false,
    };
    document.getElementById('topicInput').value = '';
    this.setState({ newState });

    let topicsUpdate = setTimeout(() => this.props.getTopics(token), 100); //Don`t know why, but works only with this way
    this.props.getTopics(token);
  };

  onDeleteClick = (e) => {
    const token = client.getToken();
    this.props.deleteTopics(token, e.target.id);
    let topicsUpdate = setTimeout(() => this.props.getTopics(token), 100);
    this.props.getTopics(token);
  };

  onReactClick = (e) => {
    const token = client.getToken();

    if (e.target.getAttribute('class') === 'violet thumbs up icon') {
      this.props.userReact(true, e.target.id, token, 'topics');
    } else {
      this.props.userReact(false, e.target.id, token, 'topics');
    }
    let topicsUpdate = setTimeout(() => this.props.getTopics(token), 100);
    this.props.getTopics(token);
  };

  render() {
    const topics = this.props.topics.map((t) => (
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
          <Icon
            color='violet'
            loading={this.props.isLoading}
            disabled={!t.canDelete || this.props.isLoading}
            onClick={this.onDeleteClick}
            name={this.props.isLoading ? 'spinner' : 'delete'}
            id={t.id}
          ></Icon>
        </List.Content>
        <List.Content>{t.title}</List.Content>
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
              Add your own{' '}
              <span style={{ color: '#5530a7', fontSize: '50px' }}>topic</span>
            </span>
            <Form.Input
              style={{ marginLeft: '60px' }}
              id='topicInput'
              icon='book'
              iconPosition='left'
              placeholder='Topic Name'
              type='topic'
              onChange={(e) => this.setState({ topic: e.target.value })}
            />
            <Button
              color='violet'
              style={{
                marginLeft: '0.5em',
              }}
              inverted
              onClick={this.onAddClick}
            >
              Add
            </Button>
            <span
              hidden={!this.state.error}
              style={{ fontWeight: 'bold', color: 'red', marginLeft: '100px' }}
            >
              {' '}
              Please enter a topic name{' '}
            </span>
          </div>

          <List style={{ marginTop: '50px ' }} divided inverted relaxed>
            {topics}
          </List>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    topics: state.topics,
    isLoading: state.itemsAreLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTopics: (token) => dispatch(getTopics(token)),
    addTopics: (data, token) => dispatch(addTopics(data, token)),
    deleteTopics: (token, id) => dispatch(deleteTopics(token, id)),
    userReact: (bool, id, token, category) =>
      dispatch(userReact(bool, id, token, category)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Topics);
