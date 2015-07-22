import React, {PropTypes} from 'react/addons';
let Router from 'react-router');
let _ from 'lodash');

let TimeunitTable from './timeunit.table');

let TimeunitActions from '../../actions/timeunit.actions');
let TimeunitStore from '../../stores/timeunit.store');
let TimesheetStore from '../../stores/timesheet.store');
let LoginStore from '../../stores/login.store');

let Timeunits = React.createClass({

  propTypes: {
    timesheet: PropTypes.object.isRequired
  },

  mixins: [
    Navigation,
    State
  ],

  store: TimeunitStore,
  timesheetStore: TimesheetStore,

  requestTimeunits: TimeunitActions.list,

  getInitialState () {
    return this.store.getState();
  },

  logTime () {
    this.transitionTo('timesheets.detail.timeunits.create', {
      user_id: this.getParams().user_id,
      _id: this.getParams()._id,
      timeunit_id: this.getParams().timeunit_id
    });
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
