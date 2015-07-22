import Router = require('react-router';
import TimeunitStore = require('../stores/timeunit.store';
import TimesheetStore = require('../stores/timesheet.store';
import ProjectStore = require('../stores/project.store';
import _ = require('lodash';

export default {

  store: TimeunitStore,
  timesheetStore: TimesheetStore,

  validate (event) {
    var field = event.target.name;
    var value = event.target.value;

    this.state.timeunit[field] = value;
    this.state.errors[field] = this.validator[field].call(this, value);
    return this.setState({timeunit: this.state.timeunit, errors: this.state.errors});
  },

  validateAll () {
    this.state.errors.project = this.validator.project.call(this, this.state.timeunit.project);
    this.state.errors.dateWorked = this.validator.dateWorked.call(this, this.state.timeunit.dateWorked);
    this.state.errors.hoursWorked = this.validator.hoursWorked.call(this, this.state.timeunit.hoursWorked);
    this.setState({errors: this.state.errors});
  },

  validateProject (value) {
    this.validate.call(this, {target: {name: 'project', value: value}});
  },

  validateDateWorked (value) {
    this.validate.call(this, {target: {name: 'dateWorked', value: value}});
  },

  hasErrors () {
    var errors = this.state.errors;
    return !!(errors.project || errors.dateWorked || errors.hoursWorked);
  },

  validator: {
    project (value) {
      // min length 1
      if (!value) {
        return 'You must select a project.';
      }

      var project = _.find(ProjectStore.getState().projects, {name: value});
      this.state.timeunit.project = project.name;

      return null;
    },

    dateWorked (value) {
      var timesheet = this.state.timesheet;

      if (!value) {
        return 'You must enter the date worked.';
      }
      else if (value < timesheet.beginDate) {
        return 'Date must be after the timesheet begin date. ' + timesheet.beginDate;
      }
      else if (value > timesheet.endDate) {
        return 'Date must be before the timesheet end date. ' + timesheet.endDate;
      }
      return null;
    },

    hoursWorked (value) {
      if (value < 0) {
        return 'Negative numbers are not valid.';
      }
      return null;
    }
  }
};
