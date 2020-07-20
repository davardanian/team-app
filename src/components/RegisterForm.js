import React, { Component, useState } from 'react';

import { userRegister } from '../actions/user';
import { getCompanies } from '../actions/companies';

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
  const [value, setValue] = useState(5);
  const label = props.label;
  const settings = {
    start: 2,
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
  // Couldn`t get a proper one for birthday pick :(
  const [currentDate, setNewDate] = useState(null);
  const onChange = (event, data) => {
    setNewDate(data.value);
    const date = document.querySelector('input[placeholder=YYYY-MM-DD]').value;
    props.birthDateSet(date);
  };

  return (
    <SemanticDatepicker
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

class RegisterForm extends Component {
  state = {
    fields: {
      firstName: '',
      email: '',
      password: '',
      lastName: '',
      birthDate: '',
      sex: '',
      avatarUrl: '',
      jsExperience: 5,
      reactExperience: 5,
      companyId: '',
    },
    fieldErrors: {},
  };

  birthDateSet = (date) => {
    const fields = { ...this.state.fields };
    fields.birthDate = date;
    this.setState({ fields });
    console.log(fields);
  };

  onInputChange = (evt) => {
    const fields = { ...this.state.fields };
    fields[evt.target.name] = evt.target.value;

    this.setState({ fields });
    console.log(fields);
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
    fields.companyId = parseInt(comp.id, 10); // Converting ID to number (cause of potential server errors)
    this.setState({ fields });
    console.log(fields);
  };

  userRegister = () => {
    this.props.register(this.state.fields);
    console.log(this.state.fields);
  };

  render() {
    return (
      <div className='RegisterForm'>
        <Grid textAlign='center' verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' style={{ color: 'white' }} textAlign='center'>
              Register account
            </Header>
            <Form size='large'>
              <Segment inverted stacked>
                <Form.Input
                  fluid
                  name='firstName'
                  icon='user'
                  iconPosition='left'
                  placeholder='Your First Name'
                  onChange={this.onInputChange}
                />
                <span style={{ color: 'red' }}>
                  {this.state.fieldErrors.name}
                </span>
                <Form.Input
                  fluid
                  icon='user'
                  name='lastName'
                  iconPosition='left'
                  placeholder='Your Last Name'
                  onChange={this.onInputChange}
                />
                <span style={{ color: 'red' }}>
                  {this.state.fieldErrors.name}
                </span>
                <Form.Input
                  fluid
                  icon='mail'
                  name='email'
                  iconPosition='left'
                  placeholder='E-mail address'
                  onChange={this.onInputChange}
                />
                <span style={{ color: 'red' }}>
                  {this.state.fieldErrors.email}
                </span>
                <Form.Input
                  fluid
                  icon='lock'
                  name='password'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  onChange={this.onInputChange}
                />
                <span style={{ color: 'red' }}>
                  {this.state.fieldErrors.password}
                </span>

                <DatePicker birthDateSet={this.birthDateSet} />
                <Form.Field
                  control={Select}
                  options={genderOptions}
                  label={{
                    htmlFor: 'form-select-control-gender',
                  }}
                  placeholder='Gender'
                  name='sex'
                  onChange={(e) => {
                    const fields = { ...this.state.fields };
                    fields.sex = e.target.textContent.toLowerCase();
                    this.setState({ fields });
                    console.log(fields);
                  }}
                />

                <Form.Input
                  fluid
                  icon='file image'
                  name='avatarUrl'
                  iconPosition='left'
                  placeholder='Avatar Url'
                  type='avatar'
                  onChange={this.onInputChange}
                />

                <ExperiencePicker
                  name='jsExperience'
                  label='JS Experience (in years)'
                  lang='js'
                  onExperienceChange={this.onExperienceChange}
                />
                <ExperiencePicker
                  name='reactExperience'
                  lang='react'
                  label='React Experience (in years)'
                  onExperienceChange={this.onExperienceChange}
                />
                <CompaniesList handleChange={this.handleChange} />
                <Button
                  basic
                  color='violet'
                  fluid
                  size='large'
                  onClick={this.userRegister}
                >
                  Register!
                </Button>
                <span style={{ color: 'green' }} hidden={!this.props.regError}>
                  {' '}
                  Wrong registration
                </span>
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
    regError: state.regError,
    isLoading: state.itemsAreLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (data) => dispatch(userRegister(data)),
    getCompanies: () => dispatch(getCompanies()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
