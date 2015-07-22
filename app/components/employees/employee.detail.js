import React, {PropTypes} from 'react/addons';
import Router, {Navigation, State} from 'react-router';
import _ from 'lodash';

import EmployeeForm from './employee.form';
import EmployeeActions from '../../actions/employee.actions';
import EmployeeMixin from '../../mixins/employee.mixin';

const EmployeeDetail = React.createClass({

  mixins: [
    Navigation,
    State,
    EmployeeMixin
  ],

  saveEmployee (event) {
    event.preventDefault();
    this.validateAll();

    if (!this.hasErrors()) {
      EmployeeActions.update(this.state.employee);
      this.transitionTo('employees');
    }
  },

  get () {
    let employee = this.store.getState().employee;
    if (_.isEmpty(employee)) {
      let employeeId = this.getParams()._id;
      EmployeeActions.get(employeeId);
    }
    else {
      this.onChange();
    }
  },

  getInitialState () {
    return {
      saveText: 'Update',
      employee: {},
      errors: {}
    };
  },

  onChange () {
    this.setState(this.store.getState());
  },

  componentWillMount () {
    this.store.addChangeListener(this.onChange);
  },

  componentWillUnmount () {
    this.store.removeChangeListener(this.onChange);
  },

  componentDidMount () {
    this.get();
  },

  render () {
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

export default EmployeeDetail;
