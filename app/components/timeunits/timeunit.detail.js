import React, {PropTypes} from 'react/addons';
let Router from 'react-router');

let TimeunitForm from './timeunit.form');
let TimeunitActions from '../../actions/timeunit.actions');
let TimeunitMixin from '../../mixins/timeunit.mixin');
let TimesheetActions from '../../actions/timesheet.actions');

let TimeunitEdit = React.createClass({

  mixins: [
    Navigation,
    State,
    TimeunitMixin
  ],

  getInitialState () {
    return {
      saveText: 'Update',
      timeunit: {},
      errors: {}
    };
  },

  onChange () {
    this.setState(this.store.getState());
  },

  onTimesheetChange () {
    this.setState({timesheet: this.timesheetStore.getState().timesheet});
  },

  componentWillMount () {
    this.store.addChangeListener(this.onChange);
    this.timesheetStore.addChangeListener(this.onTimesheetChange);
  },

  componentDidMount () {
    this.getTimesheet(this.getParams()._id);
    this.get(this.getParams()._id, this.getParams().timeunit_id);
  },

  componentWillUnmount () {
    this.store.removeChangeListener(this.onChange);
    this.timesheetStore.removeChangeListener(this.onTimesheetChange);
  },

  get (timesheetId, timeunitId) {
    let timeunit = this.store.getState().timeunit;
    if (!timeunit._id) {
      TimeunitActions.get({_id: timesheetId}, timeunitId);
    }
    else {
      this.onChange();
    }
  },

  getTimesheet (timesheetId) {
    let timesheet = this.timesheetStore.getState().timesheet;
    if (!timesheet._id) {
      TimesheetActions.get(timesheetId);
    }
    else {
      this.onTimesheetChange();
    }
  },

  saveTimeunit (e) {
    e.preventDefault();
    this.validateAll();

    if (!this.hasErrors()) {
      TimeunitActions.update(this.state.timesheet, this.state.timeunit);
      this.transitionTo('timesheets.detail', {
        user_id: this.getParams().user_id,
        _id: this.getParams()._id
      });
    }
  },

  render () {
    return (
      <TimeunitForm timeunit={this.state.timeunit}
        errors={this.state.errors}
        validateAll={this.validateAll}
        hasErrors={this.hasErrors}
        saveText={this.state.saveText}
        onSave={this.saveTimeunit}
        validate={this.validate}
        validateProject={this.validateProject}
        validateDateWorked={this.validateDateWorked} />
    );
  }
});

export default TimeunitEdit;
