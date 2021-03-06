import React, {PropTypes} from 'react/addons';
import Router, {Navigation, State as RouterState} from 'react-router';
import _ from 'lodash';
import {Promise} from 'es6-promise';

import TimesheetForm from './timesheet.form';
import Timeunits from '../timeunits/timeunits';
import TimesheetActions from '../../actions/timesheet.actions';
import TimesheetMixin from '../../mixins/timesheet.mixin';
import TimesheetStore from '../../stores/timesheet.store';
import TimeunitStore from '../../stores/timeunit.store';

import SectionHeader from '../common/section';

const TimesheetDetail = React.createClass({

  statics: {
    fetch (params, query) {
      return Promise.all([
        TimesheetStore.get({action: {timesheet: params}})
          .then(res => {return TimesheetStore.getState()}),

        TimeunitStore.list({action: {timesheet: params}})
          .then(res => {return TimeunitStore.getState()})
      ]);
    }
  },

  mixins: [Navigation, RouterState, TimesheetMixin],

  store: TimesheetStore,

  saveTimesheet (event) {
    event.preventDefault();
    this.validateAll();

    if (!this.hasErrors()) {
      TimesheetActions.update(this.state.timesheet);
      this.transitionTo(`/employees/${this.state.timesheet.user_id}/timesheets`);
    }
  },

  get (timesheetId) {
    let timesheet = this.store.getState().timesheet;
    if (_.isEmpty(timesheet)) {
      TimesheetActions.get(timesheetId);
    }
  },

  getInitialState () {
    return _.defaults(this.store.getState(), {
      saveText: 'Update',
      errors: {}
    });
  },

  onChange () {
    this.setState(this.store.getState());
  },

  componentWillMount () {
    this.get(this.props.params._id);
    this.store.addChangeListener(this.onChange);
  },

  componentWillUnmount () {
    this.store.removeChangeListener(this.onChange);
  },

  render () {
    return (
      <div>
        <div className="row">
          <SectionHeader header='Edit Timesheet' />
        </div>
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
