import React, {PropTypes} from 'react/addons';
import Router, {Navigation} from 'react-router';
import _ from 'lodash';

import ProjectTable from './project.table';
import ProjectActions from '../../actions/project.actions';
import ProjectStore from '../../stores/project.store';

import SectionHeader from '../common/section';
import Paginator from '../common/navigation/paginator';

const Projects = React.createClass({

  statics: {
    fetch (params, query) {
      return ProjectStore.list({action: {query: {page: 1}}})
        .then(res => {return ProjectStore.getState()});
    }
  },

  mixins: [Navigation],

  store: ProjectStore,

  requestProjects: ProjectActions.list,

  getInitialState () {
    return this.store.getState();
  },

  createNew () {
    this.transitionTo('/projects/create');
  },

  onChange () {
    this.setState(this.store.getState());
  },

  componentWillMount () {
    this.store.addChangeListener(this.onChange);
    this.requestProjects({page: 1});
  },

  componentWillUnmount () {
    this.store.removeChangeListener(this.onChange);
  },

  onPageChange (page) {
    this.requestProjects({page: page});
  },

  render () {

    let numPages = Math.ceil(this.state.projects.totalItems / 5);
    let pagesShown = Math.min(numPages, 5);

    return (
      <div>
        <div className="row">
          <SectionHeader header='Projects' />
        </div>

        <div className="one column row">
          <button className="ui right floated primary button pad-bottom" type="button" onClick={this.createNew}>
            New Project
          </button>
        </div>

        <div className="row">
          <ProjectTable projects={this.state.projects.data} store={ProjectStore}/>
        </div>

        <div className="ui grid pad-top">
          <div className="centered row">
            <Paginator max={numPages} maxVisible={pagesShown} onChange={this.onPageChange} />
          </div>
        </div>
      </div>
    );
  }
});

export default Projects;
