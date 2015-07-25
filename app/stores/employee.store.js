import _ from 'lodash';
import Store from '../flux/flux.store';
import actions from '../actions/employee.actions';
import SnackbarAction from '../actions/snackbar.actions';
import axios from 'axios';
import rehydrate from '../util/rehydrate';
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

    let state = rehydrate.setDefaults({
      employee: {},
      employees: {
        data: [],
        totalItems: 0,
        limit: 5,
        page: 1
      }
    });

    this.setState(state);
  }

  url (employeeId) {
    return urls.apiResource('users', employeeId);
  }

  list (payload) {

    return axios.get(this.url(), {params: payload.action.query})
      .then(res => {
        this.setState({employees: res.data});
        return this.getState();
      })
      .catch(x => {
        SnackbarAction.error('Error attempting to retrieve employees.');
      });
  }

  get (payload) {

    return axios.get(this.url(payload.action.employee._id))
      .then(res => {
        this.setState({employee: res.data});
        return this.getState();
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
        return this.getState();
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
        return this.getState();
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
        return this.getState();
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
        return this.getState();
      })
      .catch(x => {
        SnackbarAction.error('There was an error creating employee.');
      });
  }
}

export default new EmployeeStore();
