import React, {PropTypes} from 'react/addons';
import TimesheetRow from './timesheet.row';

const TimesheetTable = React.createClass({

  propTypes: {
    timesheets: PropTypes.arrayOf(PropTypes.object).isRequired,
    store: PropTypes.object.isRequired
  },

  render () {
    let store = this.props.store;

    let timesheetRows = this.props.timesheets.map(timesheet => {
      return (
        <TimesheetRow timesheet={timesheet} key={timesheet._id} store={store} />
      );
    });

    return (
      <table className="ui celled table tsz-table-row-cursor">
        <thead>
          <tr>
            <th>Begin Date</th>
            <th>End Date</th>
            <th>Name</th>
            <th>Description</th>
            <th className="tsz-table-delete-column">Delete</th>
          </tr>
        </thead>
        <tbody>
          {timesheetRows}
        </tbody>
      </table>
    );
  }
});

export default TimesheetTable;
