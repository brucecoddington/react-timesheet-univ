import _ from 'lodash';
import {Promise} from 'es6-promise';
import Store from '../flux/flux.store';
import actions from '../actions/employee.actions';
import SnackbarAction from '../actions/snackbar.actions';
import axios from 'axios';
import rehydrator from '../util/rehydrator';
import urls from '../util/urls';

class EmployeeStore extends Store {

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
      employee: rehydrator.initState('employee', {}),
      employees: rehydrator.initState('employees', {
        data: [],
        totalItems: 0,
        limit: 5,
        page: 1
      })
    });
  }

  url (employeeId) {
    return urls.apiResource('users', employeeId);
  }

  list (payload) {

    return rehydrator.slurp('employees')
      .then(rehydrated => {
        if (_.isNull(rehydrated)) {
          return axios.get(this.url(), {params: payload.action.query});
        }
        else {
          return rehydrated;
        }
      })
      .then(res => {
        this.setState({employees: res.data});
      })
      .catch(x => {
        SnackbarAction.error('Error attempting to retrieve employees.');
      });
  }

  get (payload) {
    let employeeId = payload.action.employee._id;

    return rehydrator.slurp('employee')
      .then(rehydrated => {
        if (_.isNull(rehydrated) || rehydrated.data._id !== employeeId) {
          return axios.get(this.url(payload.action.employee._id));
        }
        else {
          return rehydrated;
        }
      })
      .then(res => {
        this.setState({employee: res.data});
      })
      .catch((data) => {
        SnackbarAction.error('There was an error getting the employee');
      });
  }

  update (payload) {
    let employee = payload.action.employee;

    return axios.put(this.url(employee._id), employee)
      .then(res => {
        this.setState({employee: res.data});
        SnackbarAction.success(`Employee : ${employee.username}, updated.`);
      })
      .catch(x => {
        SnackbarAction.error('There was an error updating employee.');
      });
  }

  remove (payload) {
    let employee = payload.action.employee;
    employee.deleted = true;

    return axios.put(this.url(employee._id), employee)
      .then(res => {
        this.setState({employee: res.data});
        SnackbarAction.success(`Employee : ${res.data.username}, was deleted.`);
      })
      .catch(x => {
        SnackbarAction.error('Error attempting to delete employee.');
      });
  }

  restore (payload) {
    let employee = payload.action.employee;
    employee.deleted = false;

    return axios.put(this.url(employee._id), employee)
      .then(res => {
        this.setState({employee: res.data});
        SnackbarAction.success(`Employee : ${res.data.username}, was restored.`);
      })
      .catch(x => {
        SnackbarAction.error('Error attempting to restore employee.');
      });
  }

  create (payload) {

    return axios.post(this.url(), payload.action.employee)
      .then(res => {
        this.setState({employee: res.data});
        SnackbarAction.success(`Employee : ${res.data.username}, created.`);
      })
      .catch(x => {
        SnackbarAction.error('There was an error creating employee.');
      });
  }
}

export default new EmployeeStore();
