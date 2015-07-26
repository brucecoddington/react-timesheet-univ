import React, {PropTypes} from 'react/addons';
import Router, {Navigation, State} from 'react-router';
import moment from 'moment';

import DatePicker from '../common/datepicker/datepicker';
import TextInput from '../common/form/text.input';
import SaveButton from '../common/buttons/save.button';
import CancelButton from '../common/buttons/cancel.button';

let TimesheetForm = React.createClass({

  propTypes: {
    timesheet:          PropTypes.object,
    saveText:           PropTypes.string.isRequired,
    validate:           PropTypes.func.isRequired,
    validateBeginDate:  PropTypes.func.isRequired,
    validateEndDate:    PropTypes.func.isRequired,
    errors:             PropTypes.object,
    hasErrors:          PropTypes.func.isRequired
  },

  mixins: [
    Navigation,
    State
  ],

  onCancel (event) {
    event.preventDefault();
    this.transitionTo(`/employees/${this.state.timesheet.user_id}/timesheets`);
  },

  render () {
    return (
      <div className="ui centered grid">
        <div className="fourteen wide column">
          <form className="ui inline form" name="timesheetForm" onSubmit={this.props.onSave}>
            <div className="two fields">
              <TextInput name="name"
                placeholder="Timesheet Name"
                label="Name"
                value={this.props.timesheet.name}
                error={this.props.errors.name}
                onChange={this.props.validate} />

              <TextInput name="description"
                placeholder="Timesheet Description"
                label="Description"
                value={this.props.timesheet.description}
                error={this.props.errors.description}
                onChange={this.props.validate} />
            </div>

            <div className="two fields">
              <DatePicker key='ts-begin'
                name="beginDate"
                label="Begin Date"
                selected={moment(this.props.timesheet.beginDate)}
                value={this.props.timesheet.beginDate}
                onChange={this.props.validateBeginDate}
                error={this.props.errors.beginDate} />

              <DatePicker key='ts-end'
                name="beginDate"
                label="End Date"
                selected={moment(this.props.timesheet.endDate)}
                value={this.props.timesheet.endDate}
                onChange={this.props.validateEndDate}
                error={this.props.errors.endDate} />
            </div>

            <div className="ui sixteen column right floated grid">
              <SaveButton validateAll={this.props.validateAll} hasErrors={this.props.hasErrors()} saveText={this.props.saveText} />
              <CancelButton onCancel={this.onCancel} />
            </div>
          </form>
        </div>
      </div>
    );
  }
});

export default TimesheetForm;
