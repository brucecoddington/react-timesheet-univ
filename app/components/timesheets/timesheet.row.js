import React, {PropTypes} from 'react/addons';
import Router, {Navigation} from 'react-router';
import classNames from 'classnames';

import TimesheetActions from '../../actions/timesheet.actions';
import LoginStore from '../../stores/login.store';

import SnackbarAction from '../../actions/snackbar.actions';
import DateUtils from '../../util/date.utils';

const TimesheetRow = React.createClass({

  propTypes: {
    timesheet: PropTypes.object,
    store: PropTypes.object.isRequired
  },

  mixins: [
    Navigation
  ],

  showDetail () {
    let timesheet = this.props.timesheet;
    if (timesheet.deleted) {
      SnackbarAction.error('You cannot edit a deleted timesheet.');
      return;
    }
    this.props.store.setState({timesheet: timesheet});
    this.transitionTo('timesheets.detail',
      {user_id: timesheet.user_id, _id: timesheet._id});
  },

  remove (e) {
    e.stopPropagation();
    this.props.timesheet.deleted = true;
    TimesheetActions.remove(this.props.timesheet);
  },

  restore (e) {
   e.stopPropagation();
   this.props.timesheet.deleted = false;
   TimesheetActions.restore(this.props.timesheet);
  },

  render () {
    let timesheet = this.props.timesheet;

    let rowClasses = classNames('repeated-item fadeable-row', {
      'faded': timesheet.deleted
    });

    let buttonClasses = classNames('ui primary button small', {
      'positive': timesheet.deleted,
      'negative': !timesheet.deleted
    });

    return (
      <tr className={rowClasses} onClick={this.showDetail}>

        <td>{DateUtils.momentShortDate(timesheet.beginDate)}</td>
        <td>{DateUtils.momentShortDate(timesheet.endDate)}</td>
        <td>{timesheet.name}</td>
        <td>{timesheet.description}</td>
        <td>
          <button className={buttonClasses} onClick={timesheet.deleted ? this.restore : this.remove}>
            {timesheet.deleted ? 'Restore' : 'Delete'}
          </button>
        </td>
      </tr>
    );
  }
});

export default TimesheetRow;
