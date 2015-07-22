import dispatcher from '../flux/flux.dispatcher';

const LoginActions = {

  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  CURRENT_USER: 'CURRENT_USER',

  currentUser () {
    dispatcher.handleViewAction({
      actionType: LoginActions.CURRENT_USER
    });
  },

  login (credentials) {
    dispatcher.handleViewAction({
      actionType: LoginActions.LOGIN,
      credentials: credentials
    });
  },

  logout () {
    dispatcher.handleViewAction({
      actionType: LoginActions.LOGOUT
    });
  }
};

export default LoginActions;
