import _ from 'lodash';
import Store from '../flux/flux.store';
import actions from '../actions/project.actions';
import SnackbarAction from '../actions/snackbar.actions';
import axios from 'axios';
import rehydrate from '../util/rehydrate';
import urls from '../util/urls';

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

    let state = rehydrate.setDefaults({
      project: {},
      projects: {
        data: [],
        totalItems: 0,
        limit: 5,
        page: 1
      }
    });

    this.setState(state);
  }

  url (projectId) {
    return urls.apiResource('projects', projectId);
  }

  // page = page number
  // sort = property to sort on
  // returns totalItems
  list (payload) {

    return axios.get(this.url(), {params: payload.action.query})
      .then(res => {
        this.setState({projects: res.data});
        return this.getState();
      })
      .catch(x => {
        SnackbarAction.error('Error attempting to retrieve projects.');
      });
  }

  get (payload) {

    return axios.get(this.url(payload.action.project._id))
      .then(res => {
        this.setState({project: res.data});
        return this.getState();
      })
      .catch((data) => {
        SnackbarAction.error('There was an error getting the project');
      });
  }

  update (payload) {
    let project = payload.action.project;

    return axios.put(this.url(project._id), project)
      .then(res => {
        this.setState({project: res.data});
        SnackbarAction.success(`Project : ${project.name}, updated.`);
        return this.getState();
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
        return this.getState();
      })
      .catch(x => {
        SnackbarAction.error('Error attempting to delete project.');
      });
  }

  restore (payload) {
    let project = payload.action.project;
    project.deleted = false;

    let prom = axios.put(this.url(project._id), project)
      .then(res => {
        this.setState({project: res.data});
        SnackbarAction.success(`Project : ${res.data.name}, was restored.`);
        return this.getState();
      })
      .catch(x => {
        SnackbarAction.error('Error attempting to restore project.');
      });

    return prom;
  }

  create (payload) {

    return axios.post(this.url(), payload.action.project)
      .then(res => {
        this.setState({project: res.data});
        SnackbarAction.success(`Project : ${res.data.name}, created.`);
        return this.getState();
      })
      .catch(x => {
        SnackbarAction.error('There was an error creating project.');
      });
  }
}

export default new ProjectStore();
