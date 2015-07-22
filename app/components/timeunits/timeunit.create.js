import React, {PropTypes} from 'react/addons';
let Router from 'react-router');

let TimeunitForm from './timeunit.form');
let TimeunitMixin from '../../mixins/timeunit.mixin');
let TimeunitActions from '../../actions/timeunit.actions');
let TimesheetActions from '../../actions/timesheet.actions');

let TimeunitCreate = React.createClass({

  mixins: [
    Navigation,
    State,
    TimeunitMixin
  ],

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
