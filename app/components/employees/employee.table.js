import React, {PropTypes} from 'react/addons';
var EmployeeRow = require('./employee.row');

var EmployeeTable = React.createClass({

  propTypes: {
    employees: PropTypes.arrayOf(PropTypes.object).isRequired,
    store: PropTypes.object
  },

  render () {
    var store = this.props.store;

    var employeeRows = this.props.employees.map(function (employee) {
      return (
        <EmployeeRow employee={employee} key={employee._id} store={store}/>
      );
    });

    return (
      <table className="ui celled table tsz-table-row-cursor">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Admin</th>
            <th className="tsz-table-delete-column">Delete</th>
          </tr>
        </thead>
        <tbody>
          {employeeRows}
        </tbody>
      </table>
    );
  }
});

export default EmployeeTable;
