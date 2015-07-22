import _ from 'lodash';
import React, {PropTypes} from 'react/addons';
import Router, {State, Navigation} from 'react-router';

const SectionHeader = React.createClass({

  mixins: [
    State,
    Navigation
  ],

  getSectionName () {
    let activeRoute = _.last(this.getRoutes()).name;
    let sectionNames = {
      'employees': 'Employees',
      'employees.create': 'Create Employee',
      'employees.detail': 'Edit Employee',
      'projects': 'Projects',
      'projects.create': 'Create Project',
      'projects.detail': 'Update Project',
      'timesheets': 'Timesheets',
      'timesheets.detail': 'Timesheet Detail',
      'timesheets.edit': 'Edit Timesheet',
      'timesheets.create': 'Create Timesheet',
      'timesheets.detail.timeunits.detail': 'Update Time',
      'timesheets.detail.timeunits.create': 'Log Time'
    };

    return sectionNames[activeRoute] || '';
  },

  render  () {

    return (
      <div className="row">
        <div className="sixteen wide column">
          <h2>{this.getSectionName()}</h2>
          <hr/>
        </div>
      </div>
    );
  }
});

export default SectionHeader;
