import React from 'react/addons';
import ReactRouter from 'react-router';
import routes from './routes';

export default class Router {

  constructor() {
    this.router = ReactRouter.create({
      routes: routes,
      location: ReactRouter.HistoryLocation
    });
  }

  run(cb) {
    // start the router
    this.router.run(function (Handler, state) {
      React.render(<Handler />, document.getElementById('app'), cb);
    });
  }
}
