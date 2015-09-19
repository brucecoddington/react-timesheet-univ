import 'babel-core/polyfill';

import React from 'react';
import { Provider } from 'react-redux';

import configureStore from '../common/store/configureStore';
import App from '../common/containers/App';

const initialState = window.__INITIAL_STATE__;

const store = configureStore(initialState);

const rootElement = document.getElementById('app');

React.render(
  <Provider store={store}>
    {() => <App/>}
  </Provider>,
  rootElement
);
