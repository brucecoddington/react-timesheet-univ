import React, {PropTypes} from 'react/addons';
import Router, {Navigation, State} from 'react-router';
import _ from 'lodash';

import TimesheetForm from './timesheet.form';
import Timeunits from '../timeunits/timeunits';
import TimesheetActions from '../../actions/timesheet.actions';
import TimesheetMixin from '../../mixins/timesheet.mixin';

const TimesheetDetail = React.createClass({

  mixins: [
    Navigation,
    State,
    TimesheetMixin
  ],

  saveTimesheet (event) {
    event.preventDefault();
    this.validateAll();

    if (!this.hasErrors()) {
      TimesheetActions.update(this.state.timesheet);
      this.transitionTo('timesheets', {user_id: this.getParams().user_id});
    }
  },

  get (timesheetId) {
    let timesheet = this.store.getState().timesheet;
    if (_.isEmpty(timesheet)) {
      TimesheetActions.get(timesheetId);
    }
    else {
      this.onChange();
    }
  },

  getInitialState () {
    return {
      saveText: 'Update',
      timesheet: {},
      errors: {}
    };
  },

  onChange () {
    this.setState(this.store.getState());
  },

  componentWillMount () {
    this.get(this.getParams()._id);
    this.store.addChangeListener(this.onChange);
  },

  componentWillUnmount () {
    this.store.removeChangeListener(this.onChange);
  },

  render () {
    return (
      <div>
        <div className="row">
          <TimesheetForm timesheet={this.state.timesheet}
            saveText={this.state.saveText}
            onSave={this.saveTimesheet}
            errors={this.state.errors}
            validateAll={this.validateAll}
            hasErrors={this.hasErrors}
            validate={this.validate}
            validateBeginDate={this.validateBeginDate}
            validateEndDate={this.validateEndDate} />
        </div>

        <div className="ui divider"></div>

        <Timeunits timesheet={this.state.timesheet} />
      </div>
    );
  }
});

export default TimesheetDetail;
