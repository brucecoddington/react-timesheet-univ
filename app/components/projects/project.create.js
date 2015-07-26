import React, {PropTypes} from 'react/addons';
import Router, {Navigation} from 'react-router';

import ProjectForm from './project.form';
import ProjectActions from '../../actions/project.actions';
import ProjectMixin from '../../mixins/project.mixin';
import ProjectStore from '../../stores/project.store';

const ProjectCreate = React.createClass({

  mixins: [Navigation, ProjectMixin],

  store: ProjectStore,

  getInitialState () {
    return {
      saveText: 'Create',
      project: {},
      errors: {}
    };
  },

  onChange () {
    this.setState(this.store.getState());
  },

  componentWillMount () {
    this.store.addChangeListener(this.onChange);
  },

  componentWillUnmount () {
    this.store.removeChangeListener(this.onChange);
  },

  saveProject (event) {
    event.preventDefault();
    this.validateAll();

    if (!this.hasErrors()) {
      ProjectActions.create(this.state.project);
      this.transitionTo('/projects');
    }
  },

  render () {
    return (
      <ProjectForm project={this.state.project}
        errors={this.state.errors}
        hasErrors={this.hasErrors}
        validateAll={this.validateAll}
        saveText={this.state.saveText}
        onSave={this.saveProject}
        validate={this.validate} />
    );
  }
});

export default ProjectCreate;
