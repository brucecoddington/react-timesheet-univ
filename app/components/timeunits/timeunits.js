import React, {PropTypes} from 'react/addons';
import Router, {Navigation, State as RouterState} from 'react-router';
import _ from 'lodash';

import TimeunitTable from './timeunit.table';
import TimeunitActions from '../../actions/timeunit.actions';
import TimeunitStore from '../../stores/timeunit.store';
import TimesheetStore from '../../stores/timesheet.store';
import LoginStore from '../../stores/login.store';

let Timeunits = React.createClass({

  statics: {
    fetch (params, query) {
      return TimeunitStore.list({action: {query: query}});
    }
  },

  propTypes: {
    timesheet: PropTypes.object.isRequired
  },

  mixins: [Navigation, RouterState],

  store: TimeunitStore,
  timesheetStore: TimesheetStore,

  requestTimeunits: TimeunitActions.list,

  getInitialState () {
    return this.store.getState();
  },

  logTime () {
    let timesheet = this.props.timesheet;
    this.transitionTo(`/employees/${timesheet.user_id}/timesheets/detail/${timesheet._id}/timeunits/create`);
  },

  onChange () {
    this.setState(this.store.getState());
  },

  onTimesheetChange () {
    this.requestTimeunits(this.props.timesheet);
  },

  componentWillMount () {
    this.requestTimeunits(this.props.timesheet);
    this.store.addChangeListener(this.onChange);
    this.timesheetStore.addChangeListener(this.onTimesheetChange);
  },

  componentWillUnmount () {
    this.store.removeChangeListener(this.onChange);
    this.timesheetStore.removeChangeListener(this.onTimesheetChange);
  },

  render () {
    return (
      <div className="ui grid">
        <div className="two column row">
          <div className="column">
            <h4 className="ui pad-bottom pad-top hard">Time Units</h4>
          </div>
          <div className="column">
            <button type="button" className="ui right floated primary button"
              onClick={this.logTime}>Log Time</button>
          </div>
        </div>

        <div className="sixteen wide column">
          <TimeunitTable timeunits={this.state.timeunits}
            timesheet={this.props.timesheet}
            store={this.store}/>
        </div>
      </div>
    );
  }
});

export default Timeunits;
