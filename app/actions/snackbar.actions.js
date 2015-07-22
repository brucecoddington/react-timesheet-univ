import dispatcher from '../flux/flux.dispatcher';

const SnackbarActions = {

  ERROR: 'error',
  SUCCESS: 'success',
  INFO: 'info',
  NEW: 'new',
  HIDE: 'hide',

  error (message) {
    dispatcher.handleViewAction({
      actionType: SnackbarActions.ERROR,
      message: message
    });
  },

  success (message) {
    dispatcher.handleViewAction({
      actionType: SnackbarActions.SUCCESS,
      message: message
    });
  },

  info (message) {
    dispatcher.handleViewAction({
      actionType: SnackbarActions.INFO,
      message: message
    });
  },

  new () {
    dispatcher.handleViewAction({
      actionType: SnackbarActions.NEW
    });
  },

  hide () {
    dispatcher.handleViewAction({
      actionType: SnackbarActions.HIDE
    });
  }
};

export default  SnackbarActions;
