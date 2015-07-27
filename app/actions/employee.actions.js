import dispatcher from '../flux/flux.dispatcher';

const EmployeeActions = {

  LIST: 'LIST_EMPLOYEES',
  GET: 'GET_EMPLOYEE',
  CREATE: 'CREATE_EMPLOYEE',
  UPDATE: 'UPDATE_EMPLOYEE',
  DELETE: 'DELETE_EMPLOYEE',
  RESTORE: 'RESTORE_EMPLOYEE',
  REHYDRATE: 'REHYDRATE_EMPLOYEE',

  list (query) {
    dispatcher.handleViewAction({
      actionType: EmployeeActions.LIST,
      query: query
    });
  },

  get (id) {
    dispatcher.handleViewAction({
      actionType: EmployeeActions.GET,
      employee: {_id: id}
    });
  },

  create (employee) {
    dispatcher.handleViewAction({
      actionType: EmployeeActions.CREATE,
      employee: employee
    });
  },

  update (employee) {
    dispatcher.handleViewAction({
      actionType: EmployeeActions.UPDATE,
      employee: employee
    });
  },

  remove (employee) {
    dispatcher.handleViewAction({
      actionType: EmployeeActions.DELETE,
      employee: employee
    });
  },

  restore (employee) {
    dispatcher.handleViewAction({
      actionType: EmployeeActions.RESTORE,
      employee: employee
    });
  },

  rehydrate () {
    dispatcher.handleViewAction({
      actionType: EmployeeActions.REHYDRATE
    });
  }
};

export default EmployeeActions;
