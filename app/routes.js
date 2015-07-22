import React from 'react/addons';
import Router, {Route, Redirect, DefaultRoute, NotFoundRoute} from 'react-router';

import Index from './components/index';
import SinglePage from './components/single.page';

// Initialize the routes
export default (
  <Route name='index' path='/' handler={Index}>
    <DefaultRoute handler={SinglePage} />
    <NotFoundRoute handler={SinglePage} />
    <Route name='page' path='page' handler={SinglePage} />
  </Route>
);
