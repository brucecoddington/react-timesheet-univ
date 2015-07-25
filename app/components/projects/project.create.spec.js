let _ from 'lodash');

describe('Project Create Component: ', () => {

  let ProjectCreate,
    element,
    spies = {},
    proxies;

  let React, TestUtils;

  beforeEach(() => {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(() => {
    ProjectCreate = require('./project.create');
    ProjectActions = require('../../actions/project.actions');

    element = TestUtils.renderIntoDocument(<ProjectCreate />);

    spies.transitionTo = sinon.stub(element, 'transitionTo', _.noop);
    spies.validateAll = sinon.stub(element, 'validateAll', _.noop);
    spies.create = sinon.stub(ProjectActions, 'create', _.noop);
  });

  afterEach(() => {
    spies.validateAll.restore();
    spies.transitionTo.restore();
    spies.create.restore();
  });

  it('should instantiate the ProjectCreate', () => {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('saving an project', () => {
    beforeEach(() => {
      element.saveProject({preventDefault: _.noop});
    });

    it('should validate the entire project', () => {
      expect(spies.validateAll).to.have.been.called;
    });

    describe('when the project passes validation', () => {
      beforeEach(() => {
        spies.hasErrors = sinon.stub(element, 'hasErrors').returns(false);
      });

      afterEach(() => {
        spies.hasErrors.restore();
      });

      it('should fire a create action', () => {
        expect(spies.create).to.have.been.called;
      });

      it('should transition back to the project list', () => {
        expect(spies.transitionTo).to.have.been.calledWith('projects');
      });
    });
  });
});
