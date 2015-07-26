import React, {PropTypes} from 'react/addons';
import Router, {Navigation} from 'react-router';
import _ from 'lodash';

import ProjectForm from './project.form';
import ProjectActions from '../../actions/project.actions';
import ProjectMixin from '../../mixins/project.mixin';
import ProjectStore from '../../stores/project.store';

import SectionHeader from '../common/section';

let ProjectDetail = React.createClass({

  statics: {
    fetch (params) {
      return ProjectStore.get({action: {project: params}});
    }
  },

  mixins: [Navigation, ProjectMixin],

  store: ProjectStore,

  saveProject (event) {
    event.preventDefault();
    this.validateAll();

    if (!this.hasErrors()) {
      ProjectActions.update(this.state.project);
      this.transitionTo('/projects');
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
    this.get(this.props.params._id);
    this.store.addChangeListener(this.onChange);
  },

  componentWillUnmount () {
    this.store.removeChangeListener(this.onChange);
  },

  render  () {
    return (
      <div>
        <div className="row">
          <SectionHeader header='Edit Project' />
        </div>
        <ProjectForm project={this.state.project}
          errors={this.state.errors}
          validateAll={this.validateAll}
          hasErrors={this.hasErrors}
          saveText={this.state.saveText}
          onSave={this.saveProject}
          validate={this.validate}/>
      </div>
    );
  }
});

export default ProjectDetail;
