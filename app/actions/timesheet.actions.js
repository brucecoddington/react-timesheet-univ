import dispatcher from '../flux/flux.dispatcher';

const TimesheetActions = {

  LIST: 'LIST_TIMESHEETS',
  GET: 'GET_TIMESHEET',
  CREATE: 'CREATE_TIMESHEET',
  UPDATE: 'UPDATE_TIMESHEET',
  DELETE: 'DELETE_TIMESHEET',
  RESTORE: 'RESTORE_TIMESHEET',

  list (query) {
    dispatcher.handleViewAction({
      actionType: TimesheetActions.LIST,
      query: query
    });
  },

  get (id) {
    dispatcher.handleViewAction({
      actionType: TimesheetActions.GET,
      timesheet: {_id: id}
    });
  },

  create (timesheet) {
    dispatcher.handleViewAction({
      actionType: TimesheetActions.CREATE,
      timesheet: timesheet
    });
  },

  update (timesheet) {
    dispatcher.handleViewAction({
      actionType: TimesheetActions.UPDATE,
      timesheet: timesheet
    });
  },

  remove (timesheet) {
    dispatcher.handleViewAction({
      actionType: TimesheetActions.DELETE,
      timesheet: timesheet
    });
  },

  restore (timesheet) {
    dispatcher.handleViewAction({
      actionType: TimesheetActions.RESTORE,
      timesheet: timesheet
    });
  }
};

export default TimesheetActions;
