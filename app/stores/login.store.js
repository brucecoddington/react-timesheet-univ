import _ from 'lodash';
import Router from 'react-router';
import {Promise} from 'es6-promise';
import axios from 'axios';

import Store from '../flux/flux.store';
import actions from '../actions/login.actions';
import SnackbarAction from '../actions/snackbar.actions';

class LoginStore extends Store {

  constructor() {
    super();

    this.loginUrl = '/api/login';
    this.logoutUrl = '/api/logout';
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
    let user = this.getState().user;
    return (user !== null && user._id) ? user._id : 'all';
  }

  current (payload) {
    let self = this;

    if (this.getState().authenticated) {
      SnackbarAction.success('Welcome back, ' + this.getState().user.username + '.');
      return Promise.resolve(self.getState());
    }
    else {
      return axios.get(self.loginUrl)
        .then(function (res) {
          self.setState({
            authenticated: res.data.authenticated,
            user: res.data.user
          });
          SnackbarAction.success('Welcome back, ' + res.data.user.username + '.');
          return self.getState();
        })
        .catch(function (data) {
          SnackbarAction.error('There was an error getting the current user');
        });
    }
  }

  login (payload) {
    let self = this;

    return axios.post(this.loginUrl, payload.action.credentials)
      .then(function (res) {
        let authenticated = res.data.authenticated;
        self.setState({
          authenticated: authenticated,
          user: res.data.user
        });

        if (authenticated) {
          self.setState({authError: null, authReason: null});

          let pausedTransition = self.getState().pausedTransition;
          if (pausedTransition) {
            pausedTransition.retry();
            self.setState({pausedTransition: null});
          }
          else {
            Router.transitionTo('/app/employees');
          }

          SnackbarAction.success('Welcome back, ' + res.data.user.username + '.');
        }
        else {
          self.setState({authError: self.authErrorMessage});
        }
      })
      .catch(function (x) {
        self.setState({authError: self.authErrorMessage});
      });
  }

  logout (payload) {
    let self = this;

    return axios.post(this.logoutUrl)
      .then(function (res) {
        self.initState();
        Router.transitionTo('/login');
      })
      .catch(function (x) {
        SnackbarAction.error('There was an error logging out.');
      });
  }

  requireAuthenticatedUser (transition) {
    let self = this;

    return new Promise(function (resolve, reject) {
      let authCheckInterval = setInterval(() => {
        if (self.getState().authenticated) {
          clearInterval(authCheckInterval);
          resolve(true);
        }
      }, 200);

      if (!self.getState().authenticated && transition.path !== '/login') {
        self.setState({pausedTransition: transition});
        transition.redirect('/login');
      }
    });
  }
}

export default const store = new LoginStore();
