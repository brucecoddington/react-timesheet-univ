import ExecutionEnvironment from 'react/lib/ExecutionEnvironment';
import _ from 'lodash';
import {Promise} from 'es6-promise';
import Store from '../flux/flux.store';
import actions from '../actions/project.actions';
import SnackbarAction from '../actions/snackbar.actions';
import axios from 'axios';
import urls from '../util/urls';
import rehydrator from '../util/rehydrator';

class ProjectStore extends Store {

  constructor () {
    super();

    let events = {};
    events[actions.LIST]    = this.list;
    events[actions.GET]     = this.get;
    events[actions.UPDATE]  = this.update;
    events[actions.DELETE]  = this.remove;
    events[actions.RESTORE] = this.restore;
    events[actions.CREATE]  = this.create;
    this.register(events);

    this.setState({
      project: rehydrator.initState('project', {}),
      projects: rehydrator.initState('projects', {
        data: [],
        totalItems: 0,
        limit: 5,
        page: 1
      })
    });
  }

  url (projectId) {
    return urls.apiResource('projects', projectId);
  }

  list (payload) {

    return rehydrator.slurp('projects')
      .then(rehydrated => {
        if (_.isNull(rehydrated)) {
          return axios.get(this.url(), {params: payload.action.query});
        }
        else {
          return rehydrated;
        }
      })
      .then(res => {
        this.setState({projects: res.data});
      })
      .catch(x => {
        SnackbarAction.error('Error attempting to retrieve projects.');
      });
  }

  get (payload) {
    var projectId = payload.action.project._id;

    return rehydrator.slurp('project')
      .then(rehydrated => {
        if (_.isNull(rehydrated) || rehydrated.data._id !== projectId) {
          return axios.get(this.url(projectId));
        }
        else {
          return rehydrated;
        }
      })
      .then(res => {
        this.setState({project: res.data});
      })
      .catch(x => {
        SnackbarAction.error('There was an error getting the project');
      });
  }

  update (payload) {
    let project = payload.action.project;

    return axios.put(this.url(project._id), project)
      .then(res => {
        this.setState({project: res.data});
        SnackbarAction.success(`Project : ${project.name}, updated.`);
      })
      .catch(x => {
        SnackbarAction.error('There was an error updating project.');
      });
  }

  remove (payload) {
    let project = payload.action.project;
    project.deleted = true;

    return axios.put(this.url(project._id), project)
      .then(res => {
        this.setState({project: res.data});
        SnackbarAction.success(`Project : ${res.data.name}, was deleted.`);
      })
      .catch(x => {
        SnackbarAction.error('Error attempting to delete project.');
      });
  }

  restore (payload) {
    let project = payload.action.project;
    project.deleted = false;

    return axios.put(this.url(project._id), project)
      .then(res => {
        this.setState({project: res.data});
        SnackbarAction.success(`Project : ${res.data.name}, was restored.`);
      })
      .catch(x => {
        SnackbarAction.error('Error attempting to restore project.');
      });
  }

  create (payload) {

    return axios.post(this.url(), payload.action.project)
      .then(res => {
        this.setState({project: res.data});
        SnackbarAction.success(`Project : ${res.data.name}, created.`);
      })
      .catch(x => {
        SnackbarAction.error('There was an error creating project.');
      });
  }
}

export default new ProjectStore();
