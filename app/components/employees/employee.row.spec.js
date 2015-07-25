describe('Employee Row Component: ', () => {

  let EmployeeRow,
    SnackbarActions,
    EmployeeActions,
    EmployeeStore,
    employee,
    element,
    spies = {},
    button;

  let React, TestUtils;

  beforeEach(() => {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(() => {
    EmployeeStore = require('../../stores/employee.store');
    EmployeeRow = require('./employee.row');
    SnackbarActions = require('../../actions/snackbar.actions');
    EmployeeActions = require('../../actions/employee.actions');
  });

  it('should instantiate the EmployeeRow', () => {
    element = TestUtils.renderIntoDocument(<EmployeeRow employee={{_id: 1}} store={EmployeeStore} />);
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('clicking the row', () => {
    describe('when the employee is deleted', () => {
      beforeEach(() => {
        employee = {
          _id: 'abc123',
          deleted: true
        };

        spies.error = sinon.stub(SnackbarActions, 'error');

        element = TestUtils.renderIntoDocument(<EmployeeRow employee={employee} store={EmployeeStore} />);
        element.showDetail();
      });

      afterEach(() => {
        spies.error.restore();
      });

      it('should display an error in the snackbar', () => {
        expect(spies.error).to.have.been.calledWith('You cannot edit a deleted employee.');
      });
    });

    describe('when the employee is NOT deleted', () => {
      beforeEach(() => {
        employee = {
          _id: 'abc123',
          username: 'sterlingArcher',
          deleted: false
        };

        element = TestUtils.renderIntoDocument(<EmployeeRow employee={employee} store={EmployeeStore} />);
        spies.transitionTo = sinon.stub(element, 'transitionTo');
        element.showDetail();
      });

      afterEach(() => {
        spies.transitionTo.restore();
      });

      it('should set the employee on the stored state', () => {
        expect(element.props.store.getState().employee.username).to.equal('sterlingArcher');
      });

      it('should transition to the detail route', () => {
        expect(spies.transitionTo).to.have.been.calledWith('employees.detail', {_id: 'abc123'});
      });
    });
  });

  describe('clicking the remove button', () => {
    beforeEach(() => {
      employee = {
        _id: 'abc123',
        username: 'pamPoovey',
        deleted: false
      };

      spies.remove = sinon.stub(EmployeeActions, 'remove');

      element = TestUtils.renderIntoDocument(<EmployeeRow employee={employee} store={EmployeeStore} />);
      button = TestUtils.findRenderedDOMComponentWithClass(element, 'button');
      TestUtils.Simulate.click(button);
    });

    afterEach(() => {
      spies.remove.restore();
    });

    it('should set the employee to deleted', () => {
      expect(element.props.employee.deleted).to.be.true;
    });

    it('should fire a remove employee action', () => {
      expect(spies.remove).to.have.been.calledWith(employee);
    });
  });

  describe('clicking the restore button', () => {
    beforeEach(() => {
      employee = {
        _id: 'abc123',
        username: 'cyrilFiggus',
        deleted: true
      };

      spies.restore = sinon.stub(EmployeeActions, 'restore');

      element = TestUtils.renderIntoDocument(<EmployeeRow employee={employee} store={EmployeeStore} />);
      button = TestUtils.findRenderedDOMComponentWithClass(element, 'button');
      TestUtils.Simulate.click(button);
    });

    afterEach(() => {
      spies.restore.restore();
    });

    it('should set the employee to restored', () => {
      expect(element.props.employee.deleted).to.be.false;
    });

    it('should fire a restore employee action', () => {
      expect(spies.restore).to.have.been.calledWith(employee);
    });
  });
});
