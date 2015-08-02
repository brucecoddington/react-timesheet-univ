import {EventEmitter} from 'events';
import _ from 'lodash';
import assign from 'object-assign';
import dispatcher from './flux.dispatcher';
import rehydrator from '../util/rehydrator';

// Grab the data written to window from the server rendering.
rehydrator.init();

const CHANGE_EVENT = 'CHANGE_EVENT';

export default class Store extends EventEmitter {

  constructor () {
    super();

    this.state = {};
  }

  getState () {
    return this.state;
  }

  setState (state) {
    this.state = _.extend(this.state, state);
  }

  emitChange () {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener (callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  register (events) {

    dispatcher.register((payload) => {
      let action = payload.action;
      let promise = events[action.actionType];

      if (!_.isUndefined(promise)) {
        promise.apply(this, [payload])
          .then(() => {
            this.emitChange();
          });
      }
      return true;
    });
  }
}
