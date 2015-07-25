var _ = require('lodash'),
  React = require('react/addons'),
  TestUtils = React.addons.TestUtils,
  fluxDispatcher = require('../flux/flux.dispatcher');

describe('Employee actions: ', () => {

  var EmployeeActions,
    dispatcher,
    query,
    payload,
    employee;

  var React, TestUtils, _, fluxDispatcher;

  beforeEach(() => {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
    _ = require('lodash');
    fluxDispatcher = require('../flux/flux.dispatcher');
  });

  beforeEach(() => {
    EmployeeActions = require('./employee.actions');

    dispatcher = sinon.stub(fluxDispatcher, 'handleViewAction', _.noop);
  });

  afterEach(() => {
    dispatcher.restore();
  });

  it('should instantiate the EmployeeActions', () => {
    expect(EmployeeActions).to.be.defined;
  });

  describe('firing a list action', () => {
    beforeEach(() => {
      query = "query";
      EmployeeActions.list(query);

      payload = {query: query, actionType: EmployeeActions.LIST};
    });

    it('should dispatch a view action with the query and a type of LIST', () => {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a get action', () => {
    beforeEach(() => {
      id = "testId";
      EmployeeActions.get(id);

      payload = {employee: {_id: id}, actionType: EmployeeActions.GET};
    });

    it('should dispatch a view action with the id and a type of GET', () => {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a create action', () => {
    beforeEach(() => {
      EmployeeActions.create(employee);

      payload = {employee: employee, actionType: EmployeeActions.CREATE};
    });

    it('should dispatch a view action with the employee and a type of LIST', () => {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a update action', () => {
    beforeEach(() => {
      EmployeeActions.update(employee);

      payload = {employee: employee, actionType: EmployeeActions.UPDATE};
    });

    it('should dispatch a view action with the employee and a type of UPDATE', () => {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a remove action', () => {
    beforeEach(() => {
      EmployeeActions.remove(employee);

      payload = {employee: employee, actionType: EmployeeActions.DELETE};
    });

    it('should dispatch a view action with the employee and a type of DELETE', () => {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a restore action', () => {
    beforeEach(() => {
      EmployeeActions.restore(employee);

      payload = {employee: employee, actionType: EmployeeActions.RESTORE};
    });

    it('should dispatch a view action with the employee and a type of RESTORE', () => {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });
});
