import _ from 'lodash';
import Store from '../flux/flux.store';
import actions from '../actions/timeunit.actions';
import SnackbarAction from '../actions/snackbar.actions';
import axios from 'axios';
import LoginStore from './login.store';
import rehydrate from '../util/rehydrate';
import urls from '../util/urls';

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

    let state = rehydrate.setDefaults({
      timeunit: {},
      timeunits: []
    });

    this.setState(state);
  }

  url (timesheetId, timeunitId) {
    let userId = LoginStore.getUserId();
    let resource = `users/${userId}/timesheets/${timesheetId}/timeunits`;
    return urls.apiResource(resource, timeunitId);
  }

  list (payload) {
    let timesheet = payload.action.timesheet;

    return axios.get(this.url(timesheet._id))
      .then(res => {
        this.setState({timeunits: res.data});
        return this.getState();
      })
      .catch(x => {
        SnackbarAction.error('Error attempting to retrieve logged hours.');
      });
  }

  get (payload) {
    let timesheet = payload.action.timesheet;
    let timeunit = payload.action.timeunit;

    return axios.get(this.url(timesheet._id, timeunit._id))
      .then(res => {
        this.setState({timeunit: res.data});
        return this.getState();
      })
      .catch((data) => {
        SnackbarAction.error('There was an error getting the time.');
      });
  }

  update (payload) {
    let timesheet = payload.action.timesheet;
    let timeunit = payload.action.timeunit;

    return axios.put(this.url(timesheet._id, timeunit._id), timeunit)
      .then(res => {
        this.setState({timeunit: res.data});
        SnackbarAction.success('Your logged time has been updated.');
        return this.getState();
      })
      .catch(x => {
        SnackbarAction.error('There was an error updating time.');
      });
  }

  remove (payload) {
    let timesheet = payload.action.timesheet;
    let timeunit = payload.action.timeunit;
    timeunit.deleted = true;

    return axios.put(this.url(timesheet._id, timeunit._id), timeunit)
      .then(res => {
        this.setState({timeunit: res.data});
        SnackbarAction.success('Your logged time was deleted.');
        return this.getState();
      })
      .catch(x => {
        SnackbarAction.error('Error attempting to delete time.');
      });
  }

  restore (payload) {
    let timesheet = payload.action.timesheet;
    let timeunit = payload.action.timeunit;
    timeunit.deleted = false;

    let prom = axios.put(this.url(timesheet._id, timeunit._id), timeunit)
      .then(res => {
        this.setState({timeunit: res.data});
        SnackbarAction.success('Your logged time was restored.');
        return this.getState();
      })
      .catch(x => {
        SnackbarAction.error('Error attempting to restore time.');
      });

    return prom;
  }

  create (payload) {
    let timesheet = payload.action.timesheet;

    return axios.post(this.url(timesheet._id), payload.action.timeunit)
      .then(res => {
        this.setState({timeunit: res.data});
        SnackbarAction.success('Your time has been logged.');
        return this.getState();
      })
      .catch(x => {
        SnackbarAction.error('Error attempting to log your time.');
      });
  }
}

export default new TimeunitStore();
