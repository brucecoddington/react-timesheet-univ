describe('Project actions: ', () => {

  var ProjectActions,
    dispatcher,
    query,
    payload,
    project = 'project';

  var React, TestUtils, _, fluxDispatcher;

  beforeEach(() => {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
    _ = require('lodash');
    fluxDispatcher = require('../flux/flux.dispatcher');
  });

  beforeEach(() => {
    ProjectActions = require('./project.actions');

    dispatcher = sinon.stub(fluxDispatcher, 'handleViewAction', _.noop);
  });

  afterEach(() => {
    dispatcher.restore();
  });

  it('should instantiate the ProjectActions', () => {
    expect(ProjectActions).to.be.defined;
  });

  describe('firing a list action', () => {
    beforeEach(() => {
      query = "query";
      ProjectActions.list(query);

      payload = {query: query, actionType: ProjectActions.LIST};
    });

    it('should dispatch a view action with the query and a type of LIST', () => {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a get action', () => {
    beforeEach(() => {
      id = "testId";
      ProjectActions.get(id);

      payload = {project: {_id: id}, actionType: ProjectActions.GET};
    });

    it('should dispatch a view action with the id and a type of GET', () => {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a create action', () => {
    beforeEach(() => {
      ProjectActions.create(project);

      payload = {project: project, actionType: ProjectActions.CREATE};
    });

    it('should dispatch a view action with the project and a type of LIST', () => {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a update action', () => {
    beforeEach(() => {
      ProjectActions.update(project);

      payload = {project: project, actionType: ProjectActions.UPDATE};
    });

    it('should dispatch a view action with the project and a type of UPDATE', () => {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a remove action', () => {
    beforeEach(() => {
      ProjectActions.remove(project);

      payload = {project: project, actionType: ProjectActions.DELETE};
    });

    it('should dispatch a view action with the project and a type of DELETE', () => {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });

  describe('firing a restore action', () => {
    beforeEach(() => {
      ProjectActions.restore(project);

      payload = {project: project, actionType: ProjectActions.RESTORE};
    });

    it('should dispatch a view action with the project and a type of RESTORE', () => {
      expect(dispatcher).to.have.been.calledWith(payload);
    });
  });
});
