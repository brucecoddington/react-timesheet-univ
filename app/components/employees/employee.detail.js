import React, {PropTypes} from 'react/addons';
import Router, {Navigation} from 'react-router';
import _ from 'lodash';

import EmployeeForm from './employee.form';
import EmployeeActions from '../../actions/employee.actions';
import EmployeeMixin from '../../mixins/employee.mixin';
import EmployeeStore from '../../stores/employee.store';

import SectionHeader from '../common/section';

const EmployeeDetail = React.createClass({

  statics: {
    fetch (params) {
      return EmployeeStore.get({action: {employee: params}})
        .then(res => {return EmployeeStore.getState()});
    }
  },

  mixins: [Navigation, EmployeeMixin],

  store: EmployeeStore,

  saveEmployee (event) {
    event.preventDefault();
    this.validateAll();

    if (!this.hasErrors()) {
      EmployeeActions.update(this.state.employee);
      this.transitionTo('/employees');
    }
  },

  get (employeeId) {
    let employee = this.store.getState().employee;
    if (_.isEmpty(employee)) {
      EmployeeActions.get(employeeId);
    }
  },

  getInitialState () {
    return _.defaults(this.store.getState(), {
      saveText: 'Update',
      errors: {}
    });
  },

  onChange () {
    this.setState(this.store.getState());
  },

  componentWillMount () {
    this.get(this.props.params._id);
    this.store.addChangeListener(this.onChange);
  },

  componentWillUnmount () {
    this.store.removeChangeListener(this.onChange);
  },

  render () {
    return (
      <div>
        <div className="row">
          <SectionHeader header='Timesheets' />
        </div>
        <EmployeeForm employee={this.state.employee}
          errors={this.state.errors}
          validateAll={this.validateAll}
          hasErrors={this.hasErrors}
          saveText={this.state.saveText}
          onSave={this.saveEmployee}
          validate={this.validate}
          toggleAdmin={this.toggleAdmin} />
      </div>
    );
  }
});

export default EmployeeDetail;
