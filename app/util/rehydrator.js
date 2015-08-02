import ExecutionEnvironment from 'react/lib/ExecutionEnvironment';
import _ from 'lodash';

export default {

  appState: {},

  init () {
    if (!ExecutionEnvironment.canUseDOM) return;

    this.appState = window.AppState;
    delete window.AppState;
  },

  modelExistsInAppState (model) {
    return !(_.isUndefined(this.appState[model]));
  },

  initState (model, defaultState) {
    if (ExecutionEnvironment.canUseDOM && this.modelExistsInAppState(model)) {
      return this.appState[model];
    }
    else {
      return defaultState;
    }
  },

  slurp (model) {
    if (ExecutionEnvironment.canUseDOM && this.modelExistsInAppState(model)) {
      let resolver = Promise.resolve({data: this.appState[model]});

      // we only hydrate a model once
      delete this.appState[model];

      return resolver;
    }
    else {
      return Promise.resolve(null);
    }
  }
}
