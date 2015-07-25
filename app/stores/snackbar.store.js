import _ from 'lodash';
import Store from '../flux/flux.store';
import actions from '../actions/snackbar.actions';
import {Promise} from 'es6-promise';

class SnackbarStore extends Store {

  constructor () {
    super();

    this.currentTimeout = null;

    let events = {};
    events[actions.INFO]    = this.info;
    events[actions.SUCCESS] = this.success;
    events[actions.ERROR]   = this.error;
    events[actions.HIDE]    = this.hide;
    this.register(events);
  }

  info (payload) {

    return new Promise(resolve => {
      this.setState({
        message: payload.action.message,
        messageType: payload.action.actionType
      });
      this.reset();
      resolve();
    });
  }

  error (payload) {

    return new Promise(resolve => {
      this.setState({
        message: payload.action.message,
        messageType: payload.action.actionType
      });
      this.reset();
      resolve();
    });
  }

  success (payload) {

    return new Promise(resolve => {
      this.setState({
        message: payload.action.message,
        messageType: payload.action.actionType
      });
      this.reset();
      resolve();
    });
  }

  reset () {
    if (this.currentTimeout) {
      window.clearTimeout(this.currentTimeout);
    }

    this.currentTimeout = window.setTimeout(
      () => {
        actions.hide();
      },
      3000
    );
  }

  hide () {

    return new Promise(resolve => {
      window.clearTimeout(this.currentTimeout);
      this.currentTimeout = null;

      this.setState({
        message: ''
      });

      resolve();
    });
  }
}

export default new SnackbarStore();
