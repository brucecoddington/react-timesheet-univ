import _ from 'lodash';
import Store from '../flux/flux.store';
import actions from '../actions/project.actions';
import SnackbarAction from '../actions/snackbar.actions';
import axios from 'axios';

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
      project: {}
      pageConfig: {
        data: [],
        totalItems: 0,
        limit: 5,
        page: 1
      }
    });

    return this;
  }

  url (projectId) {
    let url = '/projects';
    if (projectId) {
      url += '/' + projectId;
    }

    return url;
  }

  // page = page number
  // sort = property to sort on
  // returns totalItems
  list (payload) {
    let self = this;

    return axios.get(this.url(), {params: payload.action.query})
      .then(function (res) {
        if (!_.isUndefined(res.data.data)) {
          self.setState({pageConfig: res.data});
        }
        else {
          self.setState({projects: res.data});
        }
        return true;
      })
      .catch(function (x) {
        SnackbarAction.error('Error attempting to retrieve projects.');
      });
  }

  get (payload) {
    let self = this;

    return axios.get(this.url(payload.action.project._id))
      .then(function (res) {
        self.setState({project: res.data});
        return true;
      })
      .catch(function (data) {
        SnackbarAction.error('There was an error getting the project');
      });
  }

  update (payload) {
    let self = this;
    let project = payload.action.project;

    return axios.put(this.url(project._id), project)
      .then(function (res) {
        self.setState({project: res.data});
        SnackbarAction.success('Project : ' + project.name + ', updated.');
      })
      .catch(function (x) {
        SnackbarAction.error('There was an error updating project.');
      });
  }

  remove (payload) {
    let self = this;
    let project = payload.action.project;
    project.deleted = true;

    return axios.put(this.url(project._id), project)
      .then(function (res) {
        self.setState({project: res.data});
        SnackbarAction.success('Project : ' + res.data.name + ', was deleted.');
        return true;
      })
      .catch(function (x) {
        SnackbarAction.error('Error attempting to delete project.');
      });
  }

  restore (payload) {
    let self = this;
    let project = payload.action.project;
    project.deleted = false;

    let prom = axios.put(this.url(project._id), project)
      .then(function (res) {
        self.setState({project: res.data});
        SnackbarAction.success('Project : ' + res.data.name + ', was restored.');
        return true;
      })
      .catch(function (x) {
        SnackbarAction.error('Error attempting to restore project.');
      });

    return prom;
  }

  create (payload) {
    let self = this;

    return axios.post(this.url(), payload.action.project)
      .then(function (res) {
        self.setState({project: res.data});
        SnackbarAction.success('Project : ' + res.data.name + ', created.');
      })
      .catch(function (x) {
        SnackbarAction.error('There was an error creating project.');
      });
  }
});

export default const store = new ProjectStore();
