describe('Project Row Component: ', () => {

  let ProjectRow,
    SnackbarActions,
    ProjectActions,
    ProjectStore,
    project,
    element,
    spies = {},
    button;

  let React, TestUtils;

  beforeEach(() => {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(() => {
    ProjectStore = require('../../stores/project.store');
    ProjectRow = require('./project.row');
    SnackbarActions = require('../../actions/snackbar.actions');
    ProjectActions = require('../../actions/project.actions');
  });

  it('should instantiate the ProjectRow', () => {
    element = TestUtils.renderIntoDocument(<ProjectRow project={{_id: 1}} store={ProjectStore} />);
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('clicking the row', () => {
    describe('when the project is deleted', () => {
      beforeEach(() => {
        project = {
          _id: 'abc123',
          deleted: true
        };

        spies.error = sinon.stub(SnackbarActions, 'error');

        element = TestUtils.renderIntoDocument(<ProjectRow project={project} store={ProjectStore} />);
        element.showDetail();
      });

      afterEach(() => {
        spies.error.restore();
      });

      it('should display an error in the snackbar', () => {
        expect(spies.error).to.have.been.calledWith('You cannot edit a deleted project.');
      });
    });

    describe('when the project is NOT deleted', () => {
      beforeEach(() => {
        project = {
          _id: 'abc123',
          name: 'projectOne',
          deleted: false
        };

        element = TestUtils.renderIntoDocument(<ProjectRow project={project} store={ProjectStore} />);
        spies.transitionTo = sinon.stub(element, 'transitionTo');
        element.showDetail();
      });

      afterEach(() => {
        spies.transitionTo.restore();
      });

      it('should set the project on the stored state', () => {
        expect(element.props.store.getState().project.name).to.equal('projectOne');
      });

      it('should transition to the detail route', () => {
        expect(spies.transitionTo).to.have.been.calledWith('/projects/abc123'});
      });
    });
  });

  describe('clicking the remove button', () => {
    beforeEach(() => {
      project = {
        _id: 'abc123',
        name: 'projectTwo',
        deleted: false
      };

      spies.remove = sinon.stub(ProjectActions, 'remove');

      element = TestUtils.renderIntoDocument(<ProjectRow project={project} store={ProjectStore} />);
      button = TestUtils.findRenderedDOMComponentWithClass(element, 'button');
      TestUtils.Simulate.click(button);
    });

    afterEach(() => {
      spies.remove.restore();
    });

    it('should set the project to deleted', () => {
      expect(element.props.project.deleted).to.be.true;
    });

    it('should fire a remove project action', () => {
      expect(spies.remove).to.have.been.calledWith(project);
    });
  });

  describe('clicking the restore button', () => {
    beforeEach(() => {
      project = {
        _id: 'abc123',
        name: 'projectThree',
        deleted: true
      };

      spies.restore = sinon.stub(ProjectActions, 'restore');

      element = TestUtils.renderIntoDocument(<ProjectRow project={project} store={ProjectStore} />);
      button = TestUtils.findRenderedDOMComponentWithClass(element, 'button');
      TestUtils.Simulate.click(button);
    });

    afterEach(() => {
      spies.restore.restore();
    });

    it('should set the project to restored', () => {
      expect(element.props.project.deleted).to.be.false;
    });

    it('should fire a restore project action', () => {
      expect(spies.restore).to.have.been.calledWith(project);
    });
  });
});
