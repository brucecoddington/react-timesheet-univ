import _ from 'lodash';
import Store from '../flux/flux.store';
import actions from '../actions/timeunit.actions';
import SnackbarAction from '../actions/snackbar.actions';
import axios from 'axios';
import LoginStore from './login.store';

class TimeunitStore extends Store {

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
      timeunit: {},
      timeunits: []
    });

    return this;
  }

  url (timesheetId, timeunitId) {
    let userId = LoginStore.getState().user._id || 'all';
    let url = '/users/' + userId + '/timesheets/' + timesheetId + '/timeunits';
    if (timeunitId) {
      url += '/' + timeunitId;
    }
    return url;
  }

  list (payload) {
    let self = this;
    let timesheet = payload.action.timesheet;

    return axios.get(this.url(timesheet._id))
      .then(function (res) {
        self.setState({timeunits: res.data});
      })
      .catch(function (x) {
        SnackbarAction.error('Error attempting to retrieve logged hours.');
      });
  }

  get (payload) {
    let self = this;
    let timesheet = payload.action.timesheet;
    let timeunit = payload.action.timeunit;

    return axios.get(this.url(timesheet._id, timeunit._id))
      .then(function (res) {
        self.setState({timeunit: res.data});
        return true;
      })
      .catch(function (data) {
        SnackbarAction.error('There was an error getting the time.');
      });
  }

  update (payload) {
    let self = this;
    let timesheet = payload.action.timesheet;
    let timeunit = payload.action.timeunit;

    return axios.put(this.url(timesheet._id, timeunit._id), timeunit)
      .then(function (res) {
        self.setState({timeunit: res.data});
        SnackbarAction.success('Your logged time has been updated.');
      })
      .catch(function (x) {
        SnackbarAction.error('There was an error updating time.');
      });
  }

  remove (payload) {
    let self = this;
    let timesheet = payload.action.timesheet;
    let timeunit = payload.action.timeunit;
    timeunit.deleted = true;

    return axios.put(this.url(timesheet._id, timeunit._id), timeunit)
      .then(function (res) {
        self.setState({timeunit: res.data});
        SnackbarAction.success('Your logged time was deleted.');
        return true;
      })
      .catch(function (x) {
        SnackbarAction.error('Error attempting to delete time.');
      });
  }

  restore (payload) {
    let self = this;
    let timesheet = payload.action.timesheet;
    let timeunit = payload.action.timeunit;
    timeunit.deleted = false;

    let prom = axios.put(this.url(timesheet._id, timeunit._id), timeunit)
      .then(function (res) {
        self.setState({timeunit: res.data});
        SnackbarAction.success('Your logged time was restored.');
        return true;
      })
      .catch(function (x) {
        SnackbarAction.error('Error attempting to restore time.');
      });

    return prom;
  }

  create (payload) {
    let self = this;
    let timesheet = payload.action.timesheet;

    return axios.post(this.url(timesheet._id), payload.action.timeunit)
      .then(function (res) {
        self.setState({timeunit: res.data});
        SnackbarAction.success('Your time has been logged.');
      })
      .catch(function (x) {
        SnackbarAction.error('Error attempting to log your time.');
      });
  }
}

export default new TimeunitStore();
