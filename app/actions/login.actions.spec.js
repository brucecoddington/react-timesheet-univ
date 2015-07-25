describe('Login actions: ', () => {

  var LoginActions,
    dispatcher,
    credentials = 'credentials';  

  var React, TestUtils, _, fluxDispatcher;

  beforeEach(() => {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
    _ = require('lodash');
    fluxDispatcher = require('../flux/flux.dispatcher');
  });

  beforeEach(() => {
    LoginActions = require('./login.actions');
    dispatcher = sinon.stub(fluxDispatcher, 'handleViewAction', _.noop);
  });

  afterEach(() => {
    dispatcher.restore();
  });

  it('should instantiate the LoginActions', () => {
    expect(LoginActions).to.be.defined;
  });

  describe('firing a currentUser action', () => {
    beforeEach(() => {
      LoginActions.currentUser();

      payload = {actionType: LoginActions.CURRENT_USER};
    });

    it('should dispatch a view action with a type of CURRENT_USER', () => {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a login action', () => {
    beforeEach(() => {
      LoginActions.login(credentials);

      payload = {credentials: credentials, actionType: LoginActions.LOGIN};
    });

    it('should dispatch a view action with the credentials and a type of LOGIN', () => {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a logout action', () => {
    beforeEach(() => {
      LoginActions.logout();

      payload = {actionType: LoginActions.LOGOUT};
    });

    it('should dispatch a view action with the employee and a type of LOGOUT', () => {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });
});
