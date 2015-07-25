import React, {PropTypes} from 'react/addons';
import TimeunitRow from './timeunit.row';

const TimeunitTable = React.createClass({

  propTypes: {
    timeunits: PropTypes.arrayOf(PropTypes.object).isRequired,
    store: PropTypes.object.isRequired
  },

  render () {
    
    let timeunitRows = this.props.timeunits.map(timeunit => {
      return (
        <TimeunitRow timeunit={timeunit}
          key={timeunit._id}
          timesheet={this.props.timesheet}
          store={this.props.store} />
      );
    });

    return (
      <table className="ui celled table tsz-table-row-cursor">
        <thead>
          <tr>
            <th>Project</th>
            <th>Date</th>
            <th>Hours</th>
            <th className="tsz-table-delete-column">Delete</th>
          </tr>
        </thead>
        <tbody>
          {timeunitRows}
        </tbody>
      </table>
    );
  }
});

export default TimeunitTable;
