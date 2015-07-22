import {EventEmitter} from 'events';
import _ from 'lodash';
import assign from 'object-assign';
import dispatcher from './flux.dispatcher';

let CHANGE_EVENT = 'CHANGE_EVENT';

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
    let self = this;

    dispatcher.register(function (payload) {
      let action = payload.action;
      let promise = events[action.actionType];

      if (!_.isUndefined(promise)) {
        promise.apply(self, [payload])
          .then(() => {
            self.emitChange();
          });
      }
      return true;
    });
  }
}
