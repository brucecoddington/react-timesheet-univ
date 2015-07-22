import React, {PropTypes} from 'react/addons';
import Router, {Navigation, State} from 'react-router';
import classNames from 'classnames';

import EmployeeActions from '../../actions/employee.actions';
import SnackbarActions from '../../actions/snackbar.actions';

const EmployeeRow = React.createClass({

  propTypes: {
    employee: PropTypes.object,
    store: PropTypes.object
  },

  mixins: [
    Navigation,
    State,
    classes
  ],

  showDetail () {
    let employee = this.props.employee;
    if (employee.deleted) {
      SnackbarActions.error('You cannot edit a deleted employee.');
      return;
    }
    this.props.store.setState({employee: employee});
    this.transitionTo('employees.detail', {_id: employee._id});
  },

  remove (e) {
    e.stopPropagation();
    this.props.employee.deleted = true;
    EmployeeActions.remove(this.props.employee);
  },

  restore (e) {
    e.stopPropagation();
    this.props.employee.deleted = false;
    EmployeeActions.restore(this.props.employee);
  },

  render () {
    let employee = this.props.employee;

    let classNames = classNames('repeated-item fadeable-row', {
      'faded': employee.deleted
    });

    let buttonClasses = classNames('ui primary button small', {
      'positive': employee.deleted,
      'negative': !employee.deleted
    });

    return (
      <tr className={classNames} ref={employee._id} onClick={this.showDetail}>

        <td>{employee.username}</td>
        <td>{employee.email}</td>
        <td>{employee.firstName}</td>
        <td>{employee.lastName}</td>
        <td>{employee.admin ? 'Yes' : 'No'}</td>
        <td>
          <button className={buttonClasses} onClick={employee.deleted ? this.restore : this.remove}>
            {employee.deleted ? 'Restore' : 'Delete'}
          </button>
        </td>
      </tr>
    );
  }
});

export default EmployeeRow;
