import React, {PropTypes} from 'react/addons';
import Router, {Navigation, State as RouterState} from 'react-router';

import TimesheetActions from '../../actions/timesheet.actions';
import TimesheetForm from './timesheet.form';
import TimesheetMixin from '../../mixins/timesheet.mixin';
import TimesheetStore from '../../stores/timesheet.store';

let TimesheetCreate = React.createClass({

  mixins: [Navigation, RouterState, TimesheetMixin],

  store: TimesheetStore,

  getInitialState () {
    return {
      saveText: 'Create',
      timesheet: {},
      errors: {}
    };
  },

  saveTimesheet (event) {
    event.preventDefault();
    this.validateAll();

    if (!this.hasErrors()) {
      TimesheetActions.create(this.state.timesheet);
      this.transitionTo('timesheets', {user_id: this.getParams().user_id});
    }
  },

  render () {
    return (
      <TimesheetForm timesheet={this.state.timesheet}
        saveText={this.state.saveText}
        errors={this.state.errors}
        hasErrors={this.hasErrors}
        onSave={this.saveTimesheet}
        validate={this.validate}
        validateAll={this.validateAll}
        validateBeginDate={this.validateBeginDate}
        validateEndDate={this.validateEndDate}/>
    );
  }
});

export default TimesheetCreate;
