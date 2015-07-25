describe('Snackbar actions: ', () => {

  var SnackbarActions,
    dispatcher,
    query,
    payload,
    message = 'message';

  var React, TestUtils, _, fluxDispatcher;

  beforeEach(() => {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
    _ = require('lodash');
    fluxDispatcher = require('../flux/flux.dispatcher');
  });

  beforeEach(() => {
    SnackbarActions = require('./snackbar.actions');

    dispatcher = sinon.stub(fluxDispatcher, 'handleViewAction', _.noop);
  });

  afterEach(() => {
    dispatcher.restore();
  });

  it('should instantiate the SnackbarActions', () => {
    expect(SnackbarActions).to.be.defined;
  });

  describe('firing a error action', () => {
    beforeEach(() => {
      SnackbarActions.error(message);

      payload = {message: message, actionType: SnackbarActions.ERROR};
    });

    it('should dispatch a view action with the message and a type of ERROR', () => {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a success action', () => {
    beforeEach(() => {
      SnackbarActions.success(message);

      payload = {message: message, actionType: SnackbarActions.SUCCESS};
    });

    it('should dispatch a view action with the id and a type of SUCCESS', () => {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a info action', () => {
    beforeEach(() => {
      SnackbarActions.info(message);

      payload = {message: message, actionType: SnackbarActions.INFO};
    });

    it('should dispatch a view action with the message and a type of INFO', () => {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a new action', () => {
    beforeEach(() => {
      SnackbarActions.new();

      payload = {actionType: SnackbarActions.NEW};
    });

    it('should dispatch a view action with the message and a type of UPDATE', () => {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a hide action', () => {
    beforeEach(() => {
      SnackbarActions.hide();

      payload = {actionType: SnackbarActions.HIDE};
    });

    it('should dispatch a view action with the message and a type of HIDE', () => {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });
});
