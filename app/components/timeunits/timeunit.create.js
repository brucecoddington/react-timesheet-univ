import React, {PropTypes} from 'react/addons';
import Router, {Navigation, State as RouterState} from 'react-router';

import TimeunitForm from './timeunit.form';
import TimeunitMixin from '../../mixins/timeunit.mixin';
import TimeunitActions from '../../actions/timeunit.actions';
import TimeunitStore from '../../stores/timeunit.store';

import TimesheetActions from '../../actions/timesheet.actions';
import TimesheetStore from '../../stores/timesheet.store';

const TimeunitCreate = React.createClass({

  mixins: [Navigation, RouterState, TimeunitMixin],

  store: TimeunitStore,
  timesheetStore: TimesheetStore,

  getInitialState () {
    return {
      saveText: 'Save',
      timeunit: {},
      errors: {}
    };
  },

  saveTimeunit (e) {
    e.preventDefault();
    this.validateAll();

    if (!this.hasErrors()) {
      TimeunitActions.create(this.state.timesheet, this.state.timeunit);
      this.transitionTo('timesheets.detail', {
        user_id: this.getParams().user_id,
        _id: this.getParams()._id
      });
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

  onTimesheetChange () {
    this.setState({timesheet: this.timesheetStore.getState().timesheet});
  },

  componentWillMount () {
    this.timesheetStore.addChangeListener(this.onTimesheetChange);
  },

  componentDidMount () {
    this.getTimesheet(this.getParams()._id);
  },

  componentWillUnmount () {
    this.store.removeChangeListener(this.onTimesheetChange);
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

export default TimeunitCreate;
