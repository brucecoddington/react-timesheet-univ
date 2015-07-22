import React, {PropTypes} from 'react/addons';
var Router = require('react-router');
var classes = require('react-classes');

var EmployeeActions = require('../../actions/employee.actions');
var SnackbarActions = require('../../actions/snackbar.actions');

var EmployeeRow = React.createClass({

  propTypes: {
    employee: PropTypes.object,
    store: PropTypes.object
  },

  mixins: [
    Router.Navigation,
    Router.State,
    classes
  ],

  showDetail: function showDetail () {
    var employee = this.props.employee;
    if (employee.deleted) {
      SnackbarActions.error('You cannot edit a deleted employee.');
      return;
    }
    this.props.store.setState({employee: employee});
    this.transitionTo('employees.detail', {_id: employee._id});
  },

  remove: function remove (e) {
    e.stopPropagation();
    this.props.employee.deleted = true;
    EmployeeActions.remove(this.props.employee);
  },

  restore: function restore (e) {
    e.stopPropagation();
    this.props.employee.deleted = false;
    EmployeeActions.restore(this.props.employee);
  },

  render () {
    var employee = this.props.employee;

    var classNames = this.getClass('repeated-item fadeable-row', {
      'faded': employee.deleted
    });

    var buttonClasses = this.getClass('ui primary button small', {
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
