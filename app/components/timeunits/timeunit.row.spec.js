describe('Timeunit Row Component: ', () => {

  let TimeunitRow,
    SnackbarActions,
    TimeunitActions,
    TimeunitStore,
    timeunit,
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
    TimeunitStore = require('../../stores/timeunit.store');
    TimeunitRow = require('./timeunit.row');
    SnackbarActions = require('../../actions/snackbar.actions');
    TimeunitActions = require('../../actions/timeunit.actions');
  });

  it('should instantiate the TimeunitRow', () => {
    element = TestUtils.renderIntoDocument(
      <TimeunitRow timesheet={{_id: 1}}
        timeunit={{_id: 1}}
        store={TimeunitStore} />
    );
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('clicking the row', () => {
    describe('when the timeunit is deleted', () => {
      beforeEach(() => {
        timeunit = {
          _id: 'timeunitId',
          deleted: true
        };

        timesheet = {user_id: 'userId', _id: 'timesheetId'};

        spies.error = sinon.stub(SnackbarActions, 'error');

        element = TestUtils.renderIntoDocument(
          <TimeunitRow timeunit={timeunit}
            timesheet={timesheet}
            store={TimeunitStore} />
        );
        element.showDetail();
      });

      afterEach(() => {
        spies.error.restore();
      });

      it('should display an error in the snackbar', () => {
        expect(spies.error).to.have.been.calledWith('You cannot edit a deleted timeunit.');
      });
    });

    describe('when the timeunit is NOT deleted', () => {
      beforeEach(() => {
        timeunit = {
          _id: 'timeunitId',
          name: 'timeunitOne',
          deleted: false
        };

        timesheet = {_id: 'timesheetId', user_id: 'userId'};

        element = TestUtils.renderIntoDocument(
          <TimeunitRow timesheet={timesheet}
            timeunit={timeunit}
            store={TimeunitStore} />
        );
        spies.transitionTo = sinon.stub(element, 'transitionTo');
        element.showDetail();
      });

      afterEach(() => {
        spies.transitionTo.restore();
      });

      it('should set the timeunit on the stored state', () => {
        expect(element.props.store.getState().timeunit.name).to.equal('timeunitOne');
      });

      it('should transition to the detail route', () => {
        expect(spies.transitionTo).to.have.been.calledWith('/employees/userId/timesheets/timesheetId/timeunits/timeunitId');
      });
    });
  });

  describe('clicking the remove button', () => {
    beforeEach(() => {
      timeunit = {
        _id: 'timeunitId',
        deleted: false
      };

      timesheet = {user_id: 'userId', _id: 'timesheetId'};

      spies.remove = sinon.stub(TimeunitActions, 'remove');

      element = TestUtils.renderIntoDocument(
        <TimeunitRow timeunit={timeunit}
          timesheet={timesheet}
          store={TimeunitStore} />
      );
      button = TestUtils.findRenderedDOMComponentWithClass(element, 'button');
      TestUtils.Simulate.click(button);
    });

    afterEach(() => {
      spies.remove.restore();
    });

    it('should set the timeunit to deleted', () => {
      expect(element.props.timeunit.deleted).to.be.true;
    });

    it('should fire a remove timeunit action', () => {
      expect(spies.remove).to.have.been.calledWith(timesheet, timeunit);
    });
  });

  describe('clicking the restore button', () => {
    beforeEach(() => {
      timeunit = {
        _id: 'timeunitId',
        deleted: true
      };

      timesheet = {user_id: 'userId', _id: 'timesheetId'};

      spies.restore = sinon.stub(TimeunitActions, 'restore');

      element = TestUtils.renderIntoDocument(
        <TimeunitRow timeunit={timeunit}
          timesheet={timesheet}
          store={TimeunitStore} />
      );
      button = TestUtils.findRenderedDOMComponentWithClass(element, 'button');
      TestUtils.Simulate.click(button);
    });

    afterEach(() => {
      spies.restore.restore();
    });

    it('should set the timeunit to restored', () => {
      expect(element.props.timeunit.deleted).to.be.false;
    });

    it('should fire a restore timeunit action', () => {
      expect(spies.restore).to.have.been.calledWith(timesheet, timeunit);
    });
  });
});
