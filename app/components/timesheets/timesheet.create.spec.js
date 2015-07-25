let _ from 'lodash');

describe('Timesheet Create Component: ', () => {

  let TimesheetCreate,
    element,
    spies = {},
    proxies;

  let React, TestUtils;

  beforeEach(() => {
    React from 'react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(() => {
    TimesheetCreate from './timesheet.create');
    TimesheetActions from '../../actions/timesheet.actions');

    element = TestUtils.renderIntoDocument(<TimesheetCreate />);

    spies.transitionTo = sinon.stub(element, 'transitionTo');
    spies.validateAll = sinon.stub(element, 'validateAll');
    spies.create = sinon.stub(TimesheetActions, 'create');
    spies.getParams = sinon.stub(element, 'getParams').returns({user_id: 'userId'});
  });

  afterEach(() => {
    spies.validateAll.restore();
    spies.transitionTo.restore();
    spies.create.restore();
    spies.getParams.restore();
  });

  it('should instantiate the TimesheetCreate', () => {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('saving a timesheet', () => {
    beforeEach(() => {
      element.saveTimesheet({preventDefault: _.noop});
    });

    it('should validate the entire timesheet', () => {
      expect(spies.validateAll).to.have.been.called;
    });

    describe('when the timesheet passes validation', () => {
      beforeEach(() => {
        spies.hasErrors = sinon.stub(element, 'hasErrors').returns(false);
      });

      afterEach(() => {
        spies.hasErrors.restore();
      });

      it('should fire a create action', () => {
        expect(spies.create).to.have.been.called;
      });

      it('should transition back to the timesheet list', () => {
        expect(spies.transitionTo).to.have.been.calledWith('timesheets', {user_id: 'userId'});
      });
    });
  });
});
