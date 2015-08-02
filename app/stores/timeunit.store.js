import _ from 'lodash';
import {Promise} from 'es6-promise';
import Store from '../flux/flux.store';
import actions from '../actions/timeunit.actions';
import SnackbarAction from '../actions/snackbar.actions';
import axios from 'axios';
import LoginStore from './login.store';
import rehydrator from '../util/rehydrator';
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

    this.setState({
      timeunit: rehydrator.initState('timeunit', {}),
      timeunits: rehydrator.initState('timeunits', [])
    });
  }

  url (timesheetId, timeunitId) {
    let userId = LoginStore.getUserId();
    let resource = `users/${userId}/timesheets/${timesheetId}/timeunits`;
    return urls.apiResource(resource, timeunitId);
  }

  list (payload) {
    let timesheet = payload.action.timesheet;

    return rehydrator.slurp('timeunits')
      .then(rehydrated => {
        if (_.isNull(rehydrated)) {
          return axios.get(this.url(timesheet._id));
        }
        else {
          return rehydrated;
        }
      })
      .then(res => {
        this.setState({timeunits: res.data});
      })
      .catch(x => {
        SnackbarAction.error('Error attempting to retrieve logged hours.');
      });
  }

  get (payload) {
    let timesheet = payload.action.timesheet;
    let timeunit = payload.action.timeunit;

    return rehydrator.slurp('timeunit')
      .then(rehydrated => {
        if (_.isNull(rehydrated) || rehydrated.data._id !== timeunit._id) {
          return axios.get(this.url(timesheet._id, timeunit._id));
        }
        else {
          return rehydrated;
        }
      })
      .then(res => {
        this.setState({timeunit: res.data});
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
      })
      .catch(x => {
        SnackbarAction.error('Error attempting to log your time.');
      });
  }
}

export default new TimeunitStore();
