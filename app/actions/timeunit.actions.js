import dispatcher from '../flux/flux.dispatcher';

const TimeunitActions = {

  LIST: 'LIST_TIMEUNITS',
  GET: 'GET_TIMEUNIT',
  CREATE: 'CREATE_TIMEUNIT',
  UPDATE: 'UPDATE_TIMEUNIT',
  DELETE: 'DELETE_TIMEUNIT',
  RESTORE: 'RESTORE_TIMEUNIT',
  REHYDRATE: 'REHYDRATE_TIMEUNIT',

  list (timesheet, query) {
    dispatcher.handleViewAction({
      actionType: TimeunitActions.LIST,
      timesheet: timesheet,
      query: query
    });
  },

  get (timesheet, id) {
    dispatcher.handleViewAction({
      actionType: TimeunitActions.GET,
      timeunit: {_id: id},
      timesheet: timesheet
    });
  },

  create (timesheet, timeunit) {
    dispatcher.handleViewAction({
      actionType: TimeunitActions.CREATE,
      timeunit: timeunit,
      timesheet: timesheet
    });
  },

  update (timesheet, timeunit) {
    dispatcher.handleViewAction({
      actionType: TimeunitActions.UPDATE,
      timeunit: timeunit,
      timesheet: timesheet
    });
  },

  remove (timesheet, timeunit) {
    dispatcher.handleViewAction({
      actionType: TimeunitActions.DELETE,
      timeunit: timeunit,
      timesheet: timesheet
    });
  },

  restore (timesheet, timeunit) {
    dispatcher.handleViewAction({
      actionType: TimeunitActions.RESTORE,
      timeunit: timeunit,
      timesheet: timesheet
    });
  },

  rehydrate () {
    dispatcher.handleViewAction({
      actionType: TimeunitActions.REHYDRATE
    });
  }
};

export default TimeunitActions;
