import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Select } from 'semantic-ui-react';
import { getCompanies } from '../actions/companies';

class CompaniesList extends Component {
  componentDidMount() {
    this.props.getCompanies();
  }

  render() {
    const companies = this.props.items.map((item) => ({
      key: item.id,
      text: item.name,
      value: item.name,
    }));
    console.log(companies);

    if (this.props.hasError) {
      return <p>Sorry! There was an error loading the items</p>;
    }

    if (this.props.isLoading) {
      return <p>Loading…</p>;
    }

    return (
      <Form.Field
        style={{ maxWidth: 450 }}
        fluid
        control={Select}
        options={companies}
        defaultValue={this.props.defaultValue}
        label={{
          htmlFor: 'form-select-control-company',
        }}
        placeholder='Company'
        onChange={this.props.handleChange}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
    hasError: state.itemsHaveError,
    isLoading: state.itemsAreLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCompanies: () => dispatch(getCompanies()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesList);
