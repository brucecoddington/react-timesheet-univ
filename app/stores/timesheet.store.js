import _ from 'lodash';
import Store from '../flux/flux.store';
import actions from '../actions/timesheet.actions';
import SnackbarAction from '../actions/snackbar.actions';
import axios from 'axios';
import LoginStore from './login.store';
import rehydrate from '../util/rehydrate';
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

    let state = rehydrate.setDefaults({
      timesheet: {},
      pageConfig: {
        data: [],
        totalItems: 0,
        limit: 5,
        page: 1
      }
    });

    this.setState(state);
  }

  url (timesheetId) {
    var resource = `users/${LoginStore.getUserId()}/timesheets`;
    return urls.apiResource(resource, timesheetId);
  }

  list (payload) {
    let self = this;

    return axios.get(this.url(), {params: payload.action.query})
      .then(function (res) {
        self.setState({pageConfig: res.data});
        return self.getState();
      })
      .catch(function (x) {
        SnackbarAction.error('Error attempting to retrieve timesheets.');
      });
  }

  get (payload) {
    let self = this;

    return axios.get(this.url(payload.action.timesheet._id))
      .then(function (res) {
        self.setState({timesheet: res.data});
        return self.getState();
      })
      .catch(function (data) {
        SnackbarAction.error('There was an error getting the timesheet');
      });
  }

  update (payload) {
    let self = this;
    let timesheet = payload.action.timesheet;

    return axios.put(this.url(timesheet._id), timesheet)
      .then(function (res) {
        self.setState({timesheet: res.data});
        SnackbarAction.success('Timesheet : ' + timesheet.name + ', updated.');
        return self.getState();
      })
      .catch(function (x) {
        SnackbarAction.error('There was an error updating timesheet.');
      });
  }

  remove (payload) {
    let self = this;
    let timesheet = payload.action.timesheet;
    timesheet.deleted = true;

    return axios.put(this.url(timesheet._id), timesheet)
      .then(function (res) {
        self.setState({timesheet: res.data});
        SnackbarAction.success('Timesheet : ' + timesheet.name + ', was deleted.');
        return self.getState();
      })
      .catch(function (x) {
        SnackbarAction.error('Error attempting to delete timesheet.');
      });
  }

  restore (payload) {
    let self = this;
    let timesheet = payload.action.timesheet;
    timesheet.deleted = false;

    return axios.put(this.url(timesheet._id), timesheet)
      .then(function (res) {
        self.setState({timesheet: res.data});
        SnackbarAction.success('Timesheet : ' + timesheet.name + ', was restored.');
        return self.getState();
      })
      .catch(function (x) {
        SnackbarAction.error('Error attempting to restore timesheet.');
      });
  }

  create (payload) {
    let self = this;

    return axios.post(this.url(), payload.action.timesheet)
      .then(function (res) {
        self.setState({timesheet: res.data});
        SnackbarAction.success('Timesheet : ' + timesheet.name + ', created.');
        return self.getState();
      })
      .catch(function (x) {
        SnackbarAction.error('There was an error creating timesheet.');
      });
  }
}

export default new TimesheetStore();
