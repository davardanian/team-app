import React from 'react';
import { Header, Container, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const HomepageHeading = () => (
  <Container textAlign='center' text>
    <Header
      as='h1'
      content='Team App'
      inverted
      style={{
        fontSize: '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: '3em',
      }}
    />
    <Header
      as='h2'
      content='PicsArt 2020 React Bootcamp'
      inverted
      style={{
        fontSize: '1.7em',
        fontWeight: 'normal',
        marginTop: '1.5em',
      }}
    />
    <Button as={Link} to='/user/teams' basic color='violet' size='huge'>
      Take a look at teams
      <Icon name='right arrow' />
    </Button>
  </Container>
);

export default HomepageHeading;
