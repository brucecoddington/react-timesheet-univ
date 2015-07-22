import React, {PropTypes} from 'react/addons';
import Router, {Navigation, State} from 'react-router';

import EmployeeForm from './employee.form';
import EmployeeActions from '../../actions/employee.actions';
import EmployeeMixin from '../../mixins/employee.mixin';

const EmployeeCreate = React.createClass({

  mixins : [
    Navigation,
    State,
    EmployeeMixin
  ],

  onChange () {
    this.setState(this.store.getState());
  },

  componentWillMount () {
    this.store.addChangeListener(this.onChange);
  },

  componentWillUnmount () {
    this.store.removeChangeListener(this.onChange);
  },

  getInitialState () {
    return {
      saveText: 'Create',
      employee: {
        admin:false
      },
      errors: {}
    };
  },

  saveEmployee (event) {
    event.preventDefault();
    this.validateAll();

    if (!this.hasErrors()) {
      EmployeeActions.create(this.state.employee);
      this.transitionTo('employees');
    }
  },

  render  () {
    return (
      <EmployeeForm employee={this.state.employee}
        errors={this.state.errors}
        validateAll={this.validateAll}
        hasErrors={this.hasErrors}
        saveText={this.state.saveText}
        onSave={this.saveEmployee}
        validate={this.validate}
        toggleAdmin={this.toggleAdmin} />
    );
  }
});

export default EmployeeCreate;
