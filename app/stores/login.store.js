import _ from 'lodash';
import Router from 'react-router';
import {Promise} from 'es6-promise';
import axios from 'axios';

import Store from '../flux/flux.store';
import actions from '../actions/login.actions';
import SnackbarAction from '../actions/snackbar.actions';
import rehydrate from '../util/rehydrate';
import urls from '../util/urls';

class LoginStore extends Store {

  constructor() {
    super();

    this.loginUrl = urls.apiResource('login');
    this.logoutUrl = urls.apiResource('logout');
    this.authErrorMessage = 'Invalid username and password combination.';

    let events = {};
    events[actions.LOGIN]   = this.login;
    events[actions.LOGOUT]  = this.logout;
    events[actions.CURRENT_USER] = this.current;
    this.register(events);

    this.initState();
  }

  initState () {
    this.setState({
      user: {_id: 'all'},
      authenticated: false,
      credentials: {},
      pausedTransition: null
    });
  }

  getUserId () {
    return this.getState().user._id;
  }

  current (payload) {
    if (this.getState().authenticated) {
      SnackbarAction.success(`Welcome back, ${this.getState().user.username}.`);
      return Promise.resolve(this.getState());
    }
    else {
      return axios.get(this.loginUrl)
        .then(res => {
          this.setState({
            authenticated: res.data.authenticated,
            user: res.data.user
          });
          SnackbarAction.success(`Welcome back, ${res.data.user.username}.`);
          return this.getState();
        })
        .catch((data) => {
          SnackbarAction.error('There was an error getting the current user');
        });
    }
  }

  login (payload) {

    return axios.post(this.loginUrl, payload.action.credentials)
      .then(res => {
        let authenticated = res.data.authenticated;
        this.setState({
          authenticated: authenticated,
          user: res.data.user
        });

        if (authenticated) {
          this.setState({authError: null, authReason: null});

          let pausedTransition = this.getState().pausedTransition;
          if (pausedTransition) {
            pausedTransition.retry();
            this.setState({pausedTransition: null});
          }
          else {
            Router.transitionTo('/employees');
          }

          SnackbarAction.success(`Welcome back, ${res.data.user.username}.`);
        }
        else {
          this.setState({authError: this.authErrorMessage});
        }
      })
      .catch((x) => {
        this.setState({authError: this.authErrorMessage});
      });
  }

  logout (payload) {

    return axios.post(this.logoutUrl)
      .then(res => {
        this.initState();
        Router.transitionTo('/login');
      })
      .catch((x) => {
        SnackbarAction.error('There was an error logging out.');
      });
  }

  requireAuthenticatedUser (transition) {

    return new Promise((resolve, reject) => {
      let authCheckInterval = setInterval(() => {
        if (this.getState().authenticated) {
          clearInterval(authCheckInterval);
          resolve(true);
        }
      }, 200);

      if (!this.getState().authenticated && transition.path !== '/login') {
        this.setState({pausedTransition: transition});
        transition.redirect('/login');
      }
    });
  }
}

export default new LoginStore();
