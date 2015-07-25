describe('Timesheet actions: ', () => {

  var TimesheetActions,
    dispatcher,
    query,
    payload,
    timesheet = 'timesheet';

  var React, TestUtils, _, fluxDispatcher;

  beforeEach(() => {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
    _ = require('lodash');
    fluxDispatcher = require('../flux/flux.dispatcher');
  });

  beforeEach(() => {
    TimesheetActions = require('./timesheet.actions');

    dispatcher = sinon.stub(fluxDispatcher, 'handleViewAction', _.noop);
  });

  afterEach(() => {
    dispatcher.restore();
  });

  it('should instantiate the TimesheetActions', () => {
    expect(TimesheetActions).to.be.defined;
  });

  describe('firing a list action', () => {
    beforeEach(() => {
      query = "query";
      TimesheetActions.list(query);

      payload = {query: query, actionType: TimesheetActions.LIST};
    });

    it('should dispatch a view action with the query and a type of LIST', () => {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a get action', () => {
    beforeEach(() => {
      id = "testId";
      TimesheetActions.get(id);

      payload = {timesheet: {_id: id}, actionType: TimesheetActions.GET};
    });

    it('should dispatch a view action with the id and a type of GET', () => {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a create action', () => {
    beforeEach(() => {
      TimesheetActions.create(timesheet);

      payload = {timesheet: timesheet, actionType: TimesheetActions.CREATE};
    });

    it('should dispatch a view action with the timesheet and a type of LIST', () => {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a update action', () => {
    beforeEach(() => {
      TimesheetActions.update(timesheet);

      payload = {timesheet: timesheet, actionType: TimesheetActions.UPDATE};
    });

    it('should dispatch a view action with the timesheet and a type of UPDATE', () => {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a remove action', () => {
    beforeEach(() => {
      TimesheetActions.remove(timesheet);

      payload = {timesheet: timesheet, actionType: TimesheetActions.DELETE};
    });

    it('should dispatch a view action with the timesheet and a type of DELETE', () => {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a restore action', () => {
    beforeEach(() => {
      TimesheetActions.restore(timesheet);

      payload = {timesheet: timesheet, actionType: TimesheetActions.RESTORE};
    });

    it('should dispatch a view action with the timesheet and a type of RESTORE', () => {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });
});
