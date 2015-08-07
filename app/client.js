import React from 'react/addons';
import Router from 'react-router';
import {history} from 'react-router/lib/BrowserHistory';
import routes from './routes';
import progress from './util/progress';
import LoginStore from './stores/login.store';

progress();

// Fire off the router and get the app rolling
// LoginStore.current().then(() => {
  React.render(<Router history={history} children={routes}/>, document.getElementById('app'));
// });
