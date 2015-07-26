describe('Timesheet Row Component: ', () => {

  let TimesheetRow,
    SnackbarActions,
    TimesheetActions,
    TimesheetStore,
    timesheet,
    element,
    spies = {},
    button;

  let React, TestUtils;

  beforeEach(() => {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(() => {
    TimesheetStore = require('../../stores/timesheet.store');
    TimesheetRow = require('./timesheet.row');
    SnackbarActions = require('../../actions/snackbar.actions');
    TimesheetActions = require('../../actions/timesheet.actions');
  });

  it('should instantiate the TimesheetRow', () => {
    element = TestUtils.renderIntoDocument(<TimesheetRow timesheet={{_id: 1}} store={TimesheetStore} />);
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('clicking the row', () => {
    describe('when the timesheet is deleted', () => {
      beforeEach(() => {
        timesheet = {
          _id: 'abc123',
          user_id: 'userId',
          deleted: true
        };

        spies.error = sinon.stub(SnackbarActions, 'error');

        element = TestUtils.renderIntoDocument(<TimesheetRow timesheet={timesheet} store={TimesheetStore} />);
        element.showDetail();
      });

      afterEach(() => {
        spies.error.restore();
      });

      it('should display an error in the snackbar', () => {
        expect(spies.error).to.have.been.calledWith('You cannot edit a deleted timesheet.');
      });
    });

    describe('when the timesheet is NOT deleted', () => {
      beforeEach(() => {
        timesheet = {
          _id: 'abc123',
          user_id: 'userId',
          name: 'timesheetOne',
          deleted: false
        };

        element = TestUtils.renderIntoDocument(<TimesheetRow timesheet={timesheet} store={TimesheetStore} />);
        spies.transitionTo = sinon.stub(element, 'transitionTo');
        element.showDetail();
      });

      afterEach(() => {
        spies.transitionTo.restore();
      });

      it('should set the timesheet on the stored state', () => {
        expect(element.props.store.getState().timesheet.name).to.equal('timesheetOne');
      });

      it('should transition to the detail route', () => {
        expect(spies.transitionTo).to.have.been.calledWith('/employees/userId/timesheets/abc123');
      });
    });
  });

  describe('clicking the remove button', () => {
    beforeEach(() => {
      timesheet = {
        _id: 'abc123',
        user_id: 'userId',
        deleted: false
      };

      spies.remove = sinon.stub(TimesheetActions, 'remove');

      element = TestUtils.renderIntoDocument(<TimesheetRow timesheet={timesheet} store={TimesheetStore} />);
      button = TestUtils.findRenderedDOMComponentWithClass(element, 'button');
      TestUtils.Simulate.click(button);
    });

    afterEach(() => {
      spies.remove.restore();
    });

    it('should set the timesheet to deleted', () => {
      expect(element.props.timesheet.deleted).to.be.true;
    });

    it('should fire a remove timesheet action', () => {
      expect(spies.remove).to.have.been.calledWith(timesheet);
    });
  });

  describe('clicking the restore button', () => {
    beforeEach(() => {
      timesheet = {
        _id: 'abc123',
        user_id: 'userId',
        deleted: true
      };

      spies.restore = sinon.stub(TimesheetActions, 'restore');

      element = TestUtils.renderIntoDocument(<TimesheetRow timesheet={timesheet} store={TimesheetStore} />);
      button = TestUtils.findRenderedDOMComponentWithClass(element, 'button');
      TestUtils.Simulate.click(button);
    });

    afterEach(() => {
      spies.restore.restore();
    });

    it('should set the timesheet to restored', () => {
      expect(element.props.timesheet.deleted).to.be.false;
    });

    it('should fire a restore timesheet action', () => {
      expect(spies.restore).to.have.been.calledWith(timesheet);
    });
  });
});
