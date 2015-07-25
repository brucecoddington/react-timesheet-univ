import ExecutionEnvironment from 'react/lib/ExecutionEnvironment';
import _ from 'lodash';

export default {

  slurp () {
    var appState;

    if (ExecutionEnvironment.canUseDOM && window.AppState) {
      appState = window.AppState;
      //delete window.AppState;
    }
    else {
      appState = {};
    }

    return appState;
  },

  setDefaults (defaultState) {
    return _.defaultsDeep(this.slurp(), defaultState);
  }
}
