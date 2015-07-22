import React, {PropTypes} from 'react/addons';
import Router from 'react-router';
import _ from 'lodash';

import ProjectForm from './project.form';
import ProjectActions from '../../actions/project.actions';
import ProjectMixin from '../../mixins/project.mixin';

let ProjectDetail = React.createClass({

  mixins: [
    Navigation,
    State,
    ProjectMixin
  ],

  saveProject (event) {
    event.preventDefault();
    this.validateAll();

    if (!this.hasErrors()) {
      ProjectActions.update(this.state.project);
      this.transitionTo('projects');
    }
  },

  get (projectId) {
    let project = this.store.getState().project;
    if (_.isEmpty(project)) {
      ProjectActions.get(projectId);
    }
    else {
      this.onChange();
    }
  },

  getInitialState () {
    return {
      saveText: 'Update',
      project: {},
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

  render  () {
    return (
      <ProjectForm project={this.state.project}
        errors={this.state.errors}
        validateAll={this.validateAll}
        hasErrors={this.hasErrors}
        saveText={this.state.saveText}
        onSave={this.saveProject}
        validate={this.validate}/>
    );
  }
});

export default ProjectDetail;
