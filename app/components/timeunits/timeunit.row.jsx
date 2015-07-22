var React = require('react/addons');
var Router = require('react-router');
var classes = require('react-classes');

var TimeunitActions = require('../../actions/timeunit.actions');
var DateUtils = require('../../util/date.utils');
var SnackbarActions = require('../../actions/snackbar.actions');

var TimeunitRow = React.createClass({

  propTypes: {
    timeunit: React.PropTypes.object.isRequired,
    timesheet: React.PropTypes.object.isRequired,
    store: React.PropTypes.object.isRequired
  },

  mixins: [
    Router.Navigation,
    classes
  ],

  showDetail: function showDetail () {
    var timeunit = this.props.timeunit;
    var timesheet = this.props.timesheet;

    if (timeunit.deleted) {
      SnackbarActions.error('You cannot edit a deleted timeunit.');
      return;
    }
    this.props.store.setState({timeunit: timeunit});
    this.transitionTo('timesheets.detail.timeunits.detail',
      {user_id: timesheet.user_id, _id: timesheet._id, timeunit_id: timeunit._id});
  },

  remove: function remove (e) {
    e.stopPropagation();
    this.props.timeunit.deleted = true;
    TimeunitActions.remove(this.props.timesheet, this.props.timeunit);
  },

  restore: function restore (e) {
   e.stopPropagation();
   this.props.timeunit.deleted = false;
   TimeunitActions.restore(this.props.timesheet, this.props.timeunit);
  },

  render: function () {
    var timeunit = this.props.timeunit;

    var rowClasses = this.getClass('repeated-item fadeable-row', {
      'faded': timeunit.deleted
    });

    var buttonClasses = this.getClass('ui primary button small', {
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

module.exports = TimeunitRow;
