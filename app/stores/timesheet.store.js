import _ from 'lodash';
import {Promise} from 'es6-promise';
import Store from '../flux/flux.store';
import actions from '../actions/timesheet.actions';
import SnackbarAction from '../actions/snackbar.actions';
import LoginStore from './login.store';
import axios from 'axios';
import rehydrator from '../util/rehydrator';
import urls from '../util/urls';

class TimesheetStore extends Store {

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
      timesheet: rehydrator.initState('timesheet', {}),
      timesheets: rehydrator.initState('timesheets', {
        data: [],
        totalItems: 0,
        limit: 5,
        page: 1
      })
    });
  }

  url (timesheetId) {
    var resource = `users/${LoginStore.getUserId()}/timesheets`;
    return urls.apiResource(resource, timesheetId);
  }

  list (payload) {

    return rehydrator.slurp('timesheets')
      .then(rehydrated => {
        if (_.isNull(rehydrated)) {
          return axios.get(this.url(), {params: payload.action.query});
        }
        else {
          return rehydrated;
        }
      })
      .then(res => {
        this.setState({timesheets: res.data});
      })
      .catch(x => {
        SnackbarAction.error('Error attempting to retrieve timesheets.');
      });
  }

  get (payload) {
    let timesheetId = payload.action.timesheet._id;

    return rehydrator.slurp('timesheet')
      .then(rehydrated => {
        if (_.isNull(rehydrated) || rehydrated.data._id !== timesheetId) {
          return axios.get(this.url(payload.action.timesheet._id));
        }
        else {
          return rehydrated;
        }
      })
      .then(res => {
        this.setState({timesheet: res.data});
      })
      .catch((data) => {
        SnackbarAction.error('There was an error getting the timesheet');
      });
  }

  update (payload) {
    let timesheet = payload.action.timesheet;

    return axios.put(this.url(timesheet._id), timesheet)
      .then(res => {
        this.setState({timesheet: res.data});
        SnackbarAction.success(`Timesheet : ${timesheet.name}, updated.`);
      })
      .catch(x => {
        SnackbarAction.error('There was an error updating timesheet.');
      });
  }

  remove (payload) {
    let timesheet = payload.action.timesheet;
    timesheet.deleted = true;

    return axios.put(this.url(timesheet._id), timesheet)
      .then(res => {
        this.setState({timesheet: res.data});
        SnackbarAction.success(`Timesheet : ${timesheet.name}, was deleted.`);
      })
      .catch(x => {
        SnackbarAction.error('Error attempting to delete timesheet.');
      });
  }

  restore (payload) {
    let timesheet = payload.action.timesheet;
    timesheet.deleted = false;

    return axios.put(this.url(timesheet._id), timesheet)
      .then(res => {
        this.setState({timesheet: res.data});
        SnackbarAction.success(`Timesheet : ${timesheet.name}, was restored.`);
      })
      .catch(x => {
        SnackbarAction.error('Error attempting to restore timesheet.');
      });
  }

  create (payload) {

    return axios.post(this.url(), payload.action.timesheet)
      .then(res => {
        this.setState({timesheet: res.data});
        SnackbarAction.success(`Timesheet : ${timesheet.name}, created.`);
      })
      .catch(x => {
        SnackbarAction.error('There was an error creating timesheet.');
      });
  }
}

export default new TimesheetStore();
