import React, {PropTypes} from 'react/addons';
let Router from 'react-router');
import classNames from 'classnames';

let TimeunitActions from '../../actions/timeunit.actions');
let DateUtils from '../../util/date.utils');
let SnackbarActions from '../../actions/snackbar.actions');

let TimeunitRow = React.createClass({

  propTypes: {
    timeunit: PropTypes.object.isRequired,
    timesheet: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  },

  mixins: [
    Navigation,
    classes
  ],

  showDetail showDetail () {
    let timeunit = this.props.timeunit;
    let timesheet = this.props.timesheet;

    if (timeunit.deleted) {
      SnackbarActions.error('You cannot edit a deleted timeunit.');
      return;
    }
    this.props.store.setState({timeunit: timeunit});
    this.transitionTo('timesheets.detail.timeunits.detail',
      {user_id: timesheet.user_id, _id: timesheet._id, timeunit_id: timeunit._id});
  },

  remove remove (e) {
    e.stopPropagation();
    this.props.timeunit.deleted = true;
    TimeunitActions.remove(this.props.timesheet, this.props.timeunit);
  },

  restore restore (e) {
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
