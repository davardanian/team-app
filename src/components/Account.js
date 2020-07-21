import React, { Component, useState } from 'react';

import { userInfo, userUpdate } from '../actions/user';
import { getCompanies } from '../actions/companies';
import { client } from './client';

import { Slider } from 'react-semantic-ui-range';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import { connect } from 'react-redux';
import CompaniesList from './CompaniesList';

import {
  Button,
  Form,
  Grid,
  Header,
  Select,
  Label,
  Message,
  Segment,
} from 'semantic-ui-react';

import './LoginForm.css';

const ExperiencePicker = (props) => {
  const [value, setValue] = useState(props.start);
  const label = props.label;
  const settings = {
    start: props.start,
    min: 0,
    max: 30,
    step: 1,
    onChange: (value) => {
      setValue(value);
      props.onExperienceChange(props.lang, value);
    },
  };

  return (
    <div className='ui segment'>
      <Message color='violet'>{label}</Message>
      <Slider label='js exp' value={value} color='violet' settings={settings} />

      <Label color='violet'>{value}</Label>
    </div>
  );
};

const DatePicker = (props) => {
  const [currentDate, setNewDate] = useState(null); //currentDate is needed for component to work
  const onChange = (event, data) => {
    setNewDate(data.value);
    const date = document.querySelector('input[placeholder=YYYY-MM-DD]').value;
    props.birthDateSet(date);
    console.log(data);
  };
  let dat = props.birthDate.split('-');

  let date = new Date(dat[0], dat[1] - 1, dat[2]);
  return (
    <SemanticDatepicker
      value={date}
      onChange={onChange}
      maxDate={Date.now()}
      showToday={false}
    />
  );
};

const genderOptions = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
];

class Account extends Component {
  state = {
    fields: {
      firstName: '',
      email: '',
      lastName: '',
      birthDate: '',
      sex: '',
      avatarUrl: '',
      jsExperience: '',
      reactExperience: '',
      companyId: '',
    },
  };

  birthDateSet = (date) => {
    const fields = { ...this.state.fields };
    fields.birthDate = date;
    this.setState({ fields });
    console.log(fields);
  };

  toDate = (dateStr) => {
    var parts = dateStr.split('-');
    return new Date(parts[2], parts[1] - 1, parts[0]);
  };

  onInputChange = (evt) => {
    const fields = { ...this.state.fields };
    fields[evt.target.name] = evt.target.value;

    this.setState({ fields });
    console.log(this.state.fields);
  };

  onExperienceChange = (lang, value) => {
    const fields = { ...this.state.fields };

    lang === 'js'
      ? (fields.jsExperience = value)
      : (fields.reactExperience = value);
    this.setState({ fields });
    console.log(fields);
  };

  handleChange = (e) => {
    const comp = this.props.items.find((n) => n.name === e.target.textContent);
    console.log('comp =' + comp.id);
    const fields = { ...this.state.fields };
    fields.companyId = parseInt(comp.id, 10);
    this.setState({ fields });
    console.log(fields);
  };

  userUpdate = () => {
    const token = client.getToken();
    this.props.update(this.state.fields, token);
    console.log(this.state.fields);
  };

  componentDidMount() {
    const token = client.getToken();
    this.props.getInfo(token);
    this.props.getCompanies();
    this.setState({ fields: this.props.user });
  }

  render() {
    return (
      <div className='RegisterForm'>
        <Grid textAlign='center' verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' style={{ color: 'white' }} textAlign='center'>
              Update your info
            </Header>
            <Form size='large'>
              <Segment inverted stacked>
                <Form.Input
                  fluid
                  defaultValue={this.props.user.firstName}
                  name='firstName'
                  icon='user'
                  iconPosition='left'
                  placeholder='Your First Name'
                  onChange={this.onInputChange}
                />

                <Form.Input
                  fluid
                  icon='user'
                  defaultValue={this.props.user.lastName}
                  name='lastName'
                  iconPosition='left'
                  placeholder='Your Last Name'
                  onChange={this.onInputChange}
                />

                <Form.Input
                  fluid
                  icon='mail'
                  defaultValue={this.props.user.email}
                  name='email'
                  iconPosition='left'
                  placeholder='E-mail address'
                  onChange={this.onInputChange}
                />

                <DatePicker
                  birthDate={this.props.user.birthDate}
                  birthDateSet={this.birthDateSet}
                />
                <Form.Field
                  control={Select}
                  options={genderOptions}
                  defaultValue={this.props.user.sex}
                  label={{
                    htmlFor: 'form-select-control-gender',
                  }}
                  placeholder='Gender'
                  name='sex'
                  onChange={(e) => {
                    const fields = this.state.fields;
                    fields.sex = e.target.textContent.toLowerCase();
                    this.setState({ fields });
                    console.log(fields);
                  }}
                />

                <Form.Input
                  fluid
                  icon='file image'
                  defaultValue={this.props.user.avatarUrl}
                  name='avatarUrl'
                  iconPosition='left'
                  placeholder='Avatar Url'
                  type='avatar'
                  onChange={this.onInputChange}
                />

                <ExperiencePicker
                  start={this.props.user.jsExperience}
                  name='jsExperience'
                  label='JS Experience (in years)'
                  lang='js'
                  onExperienceChange={this.onExperienceChange}
                />
                <ExperiencePicker
                  name='reactExperience'
                  start={this.props.user.reactExperience}
                  lang='react'
                  label='React Experience (in years)'
                  onExperienceChange={this.onExperienceChange}
                />
                <CompaniesList
                  defaultValue='PicsArt Bootcamp 2020 Test'
                  handleChange={this.handleChange}
                />
                <Button
                  basic
                  color='violet'
                  fluid
                  size='large'
                  onClick={this.userUpdate}
                >
                  Update!
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    items: state.items,
    loginError: state.loginError,
    isLoading: state.itemsAreLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    update: (data, token) => dispatch(userUpdate(data, token)),

    getCompanies: () => dispatch(getCompanies()),
    getInfo: (token) => dispatch(userInfo(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
