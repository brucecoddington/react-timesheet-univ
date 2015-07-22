import {Dispatcher as FluxDispatcher} from 'flux';
import _ from 'lodash';

class Dispatcher extends FluxDispatcher {

  constructor () {
    super();
  }

  /**
   * A bridge function between the views and the dispatcher, marking the action
   * as a view action.  Another letiant here could be handleServerAction.
   * @param  {object} action The data coming from the view.
   */
  handleViewAction (action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  }

}

export default new Dispatcher();
