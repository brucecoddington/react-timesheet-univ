import React, {PropTypes} from 'react/addons';
import Router, {Navigation} from 'react-router';
import classNames from 'classnames';

import TimeunitActions from '../../actions/timeunit.actions';
import DateUtils from '../../util/date.utils';
import SnackbarActions from '../../actions/snackbar.actions';

const TimeunitRow = React.createClass({

  propTypes: {
    timeunit: PropTypes.object.isRequired,
    timesheet: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  },

  mixins: [
    Navigation
  ],

  showDetail () {
    let timeunit = this.props.timeunit;
    let timesheet = this.props.timesheet;

    if (timeunit.deleted) {
      SnackbarActions.error('You cannot edit a deleted timeunit.');
      return;
    }
    this.props.store.setState({timeunit: timeunit});
    this.transitionTo(`/employees/${timesheet.user_id}/timesheets/detail/${timesheet._id}/timeunits/edit/${timeunit._id}`);
  },

  remove (e) {
    e.stopPropagation();
    this.props.timeunit.deleted = true;
    TimeunitActions.remove(this.props.timesheet, this.props.timeunit);
  },

  restore (e) {
   e.stopPropagation();
   this.props.timeunit.deleted = false;
   TimeunitActions.restore(this.props.timesheet, this.props.timeunit);
  },

  render () {
    let timeunit = this.props.timeunit;

    let rowClasses = classNames('repeated-item fadeable-row', {
      'faded': timeunit.deleted
    });

    let buttonClasses = classNames('ui primary button small', {
      'positive': timeunit.deleted,
      'negative': !timeunit.deleted
    });

    return (
      <tr className={rowClasses} onClick={this.showDetail}>

        <td>{timeunit.project}</td>
        <td>{DateUtils.momentShortDate(timeunit.dateWorked)}</td>
        <td>{timeunit.hoursWorked}</td>
        <td>
          <button className={buttonClasses} onClick={timeunit.deleted ? this.restore : this.remove}>
            {timeunit.deleted ? 'Restore' : 'Delete'}
          </button>
        </td>
      </tr>
    );
  }
});

export default TimeunitRow;
