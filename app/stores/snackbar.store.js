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
    let self = this;

    return new Promise((resolve) => {
      self.setState({
        message: payload.action.message,
        messageType: payload.action.actionType
      });
      self.reset();
      resolve();
    });
  }

  error (payload) {
    let self = this;

    return new Promise((resolve) => {
      self.setState({
        message: payload.action.message,
        messageType: payload.action.actionType
      });
      self.reset();
      resolve();
    });
  }

  success (payload) {
    let self = this;

    return new Promise((resolve) => {
      self.setState({
        message: payload.action.message,
        messageType: payload.action.actionType
      });
      self.reset();
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
    let self = this;

    return new Promise((resolve) => {
      window.clearTimeout(self.currentTimeout);
      self.currentTimeout = null;

      self.setState({
        message: ''
      });

      resolve();
    });
  }
}

export default new SnackbarStore();
