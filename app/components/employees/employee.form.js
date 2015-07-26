import React, {PropTypes} from 'react/addons';
import Router, {Navigation} from 'react-router';

import TextInput from '../common/form/text.input';
import Checkbox from '../common/form/checkbox';
import SaveButton from '../common/buttons/save.button';
import CancelButton from '../common/buttons/cancel.button';

const EmployeeForm = React.createClass({

  propTypes: {
    employee:   PropTypes.object,
    errors:     PropTypes.object,
    validate:   PropTypes.func.isRequired,
    hasErrors:  PropTypes.func.isRequired,
    toggleAdmin: PropTypes.func,
    onSave: PropTypes.func.isRequired
  },

  mixins: [
    Navigation
  ],

  onCancel (event) {
    event.preventDefault();
    this.transitionTo('/employees');
  },

  render () {
    return (
      <div className="ui ten column centered grid">
        <div className="ten wide column">
          <form className="ui inline form" name="employeeForm" onSubmit={this.props.onSave}>

            <TextInput name="username"
              label="Username"
              placeholder="Employee Username"
              value={this.props.employee.username}
              error={this.props.errors.username}
              onChange={this.props.validate} />

            <TextInput name="email"
              label="Email"
              placeholder="Employee Email"
              value={this.props.employee.email}
              error={this.props.errors.email}
              onChange={this.props.validate} />

            <TextInput name="firstName"
              label="First Name"
              placeholder="First Name"
              value={this.props.employee.firstName}
              error={this.props.errors.firstName}
              onChange={this.props.validate} />

            <TextInput name="lastName"
              label="Last Name"
              placeholder="Last Name"
              value={this.props.employee.lastName}
              error={this.props.errors.lastName}
              onChange={this.props.validate} />

            <Checkbox name="admin"
              label="Admin"
              value={this.props.employee.admin}
              onClick={this.props.toggleAdmin}
              onChange={this.props.validate} />

            <div className="ui horizontal divider"></div>

            <div className="ui sixteen column right floated grid">
              <SaveButton validateAll={this.props.validateAll} hasErrors={this.props.hasErrors()} saveText={this.props.saveText} />
              <CancelButton onCancel={this.onCancel} />
            </div>
          </form>
        </div>
      </div>
    );
  }
});

export default EmployeeForm;
