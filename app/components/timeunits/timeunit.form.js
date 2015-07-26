import moment from 'moment';
import React, {PropTypes} from 'react/addons';
import Router, {Navigation, State} from 'react-router';

import ProjectActions from '../../actions/project.actions';
import ProjectStore from '../../stores/project.store';

import DatePicker from '../common/datepicker/datepicker';
import Select from '../common/form/select';
import TextInput from '../common/form/text.input';
import NumberInput from '../common/form/number.input';
import SaveButton from '../common/buttons/save.button';
import CancelButton from '../common/buttons/cancel.button';

const TimeunitForm = React.createClass({

  propTypes: {
    timeunit:           PropTypes.object.isRequired,
    validate:           PropTypes.func.isRequired,
    validateProject:    PropTypes.func.isRequired,
    validateDateWorked: PropTypes.func.isRequired,
    onSave:             PropTypes.func.isRequired,
    errors:             PropTypes.object,
    saveText:           PropTypes.string,
    hasErrors:          PropTypes.func
  },

  mixins: [
    Navigation,
    State
  ],

  projectStore: ProjectStore,

  requestProjects: ProjectActions.list,

  getInitialState () {
    return {
      options: [],
      projects: []
    };
  },

  onProjectsChange () {
    let projects = this.projectStore.getState().projects;
    let options = [];

    projects.forEach(project => {
      options.push({value: project.name, label: project.name});
    });

    this.setState({options: options, projects: projects});
  },

  componentWillMount () {
    this.projectStore.addChangeListener(this.onProjectsChange);
    this.requestProjects();
  },

  componentWillUnmount () {
    this.projectStore.removeChangeListener(this.onProjectsChange);
  },

  onCancel (event) {
    event.preventDefault();
    this.transitionTo(`/employees/${this.getParams().user_id}/timesheets/${this.getParams()._id}`);
  },

  render  () {

    return (
      <div className="ui ten column centered grid">
        <div className="ten wide column">
          <form className="ui inline form" name="timeunitForm" onSubmit={this.props.onSave}>

            <Select name="project"
              label="Project"
              placeholder="Select Project"
              value={this.props.timeunit.project}
              onChange={this.props.validateProject}
              error={this.props.errors.project}
              options={this.state.options} />

            <DatePicker key='tu-worked'
              name="dateWorked"
              label="Date"
              className="form-control"
              selected={moment(this.props.timeunit.dateWorked)}
              onChange={this.props.validateDateWorked}
              error={this.props.errors.dateWorked}/>

            <NumberInput name="hoursWorked"
              label="Hours Worked"
              placeholder="Hours Worked"
              value={this.props.timeunit.hoursWorked}
              error={this.props.errors.hoursWorked}
              onChange={this.props.validate} />

            <div className="ui horizontal divider"></div>

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

export default TimeunitForm;
