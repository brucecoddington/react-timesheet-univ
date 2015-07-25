describe('Timeunit actions: ', () => {

  var TimeunitActions,
    dispatcher,
    query,
    payload,
    timesheet = 'timesheet',
    timeunit = 'timeunit';

  var React, TestUtils, _, fluxDispatcher;

  beforeEach(() => {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
    _ = require('lodash');
    fluxDispatcher = require('../flux/flux.dispatcher');
  });

  beforeEach(() => {
    TimeunitActions = require('./timeunit.actions');

    dispatcher = sinon.stub(fluxDispatcher, 'handleViewAction', _.noop);
  });

  afterEach(() => {
    dispatcher.restore();
  });

  it('should instantiate the TimeunitActions', () => {
    expect(TimeunitActions).to.be.defined;
  });

  describe('firing a list action', () => {
    beforeEach(() => {
      query = "query";
      TimeunitActions.list(timesheet, query);

      payload = {query: query, timesheet: timesheet, actionType: TimeunitActions.LIST};
    });

    it('should dispatch a view action with the query and a type of LIST', () => {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a get action', () => {
    beforeEach(() => {
      id = "testId";
      TimeunitActions.get(timesheet, id);

      payload = {timeunit: {_id: id}, timesheet: timesheet, actionType: TimeunitActions.GET};
    });

    it('should dispatch a view action with the id and a type of GET', () => {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a create action', () => {
    beforeEach(() => {
      TimeunitActions.create(timesheet, timeunit);

      payload = {timeunit: timeunit, timesheet: timesheet, actionType: TimeunitActions.CREATE};
    });

    it('should dispatch a view action with the timeunit and a type of LIST', () => {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a update action', () => {
    beforeEach(() => {
      TimeunitActions.update(timesheet, timeunit);

      payload = {timeunit: timeunit, timesheet: timesheet, actionType: TimeunitActions.UPDATE};
    });

    it('should dispatch a view action with the timeunit and a type of UPDATE', () => {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a remove action', () => {
    beforeEach(() => {
      TimeunitActions.remove(timesheet, timeunit);

      payload = {timeunit: timeunit, timesheet: timesheet, actionType: TimeunitActions.DELETE};
    });

    it('should dispatch a view action with the timeunit and a type of DELETE', () => {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a restore action', () => {
    beforeEach(() => {
      TimeunitActions.restore(timesheet, timeunit);

      payload = {timeunit: timeunit, timesheet: timesheet, actionType: TimeunitActions.RESTORE};
    });

    it('should dispatch a view action with the timeunit and a type of RESTORE', () => {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });
});
