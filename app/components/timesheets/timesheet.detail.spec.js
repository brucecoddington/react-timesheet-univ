let _ from 'lodash');
let proxyquire from 'proxyquireify')(require);
let mockComponent from '../mock');

describe('Timesheet Detail Component: ', () => {

  let TimesheetDetail,
    element,
    spies = {},
    proxies;

  let React, TestUtils;

  beforeEach(() => {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(() => {
    proxies = {
      './timesheet.form': mockComponent('TimesheetForm'),
      '../../actions/timesheet.actions': {
        get: sinon.stub(),
        update: sinon.stub()
      },
      'react-router': {
        RouteHandler: mockComponent('RouteHandler'),
        Link: mockComponent('Link'),
        State: {
          getParams () {return {_id: 'abc123'}}
        }
      }
    };

    TimesheetDetail = proxyquire('./timesheet.detail', proxies);
    element = TestUtils.renderIntoDocument(<TimesheetDetail />);

    spies.transitionTo = sinon.stub(element, 'transitionTo');
    spies.validateAll = sinon.stub(element, 'validateAll');
  });

  afterEach(() => {
    spies.transitionTo.restore();
    spies.validateAll.restore();
  });

  it('should instantiate the TimesheetDetail', () => {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('getting the timesheet', () => {
    describe('and the timesheet exists on the store state', () => {
      beforeEach(() => {
        element.store.state.timesheet = {_id: 'abc123'};
        element.get();
      });

      it('should set the timesheet on the component state', () => {
        expect(element.state.timesheet._id).to.equal('abc123');
      });
    });

    describe('and the timesheet does NOT exist in the stored state', () => {
      beforeEach(() => {
        element.get();
      });

      it('should fire a get timesheet action', () => {
        expect(proxies['../../actions/timesheet.actions'].get).to.have.been.calledWith('abc123');
      });
    });
  });

  describe('saving an timesheet', () => {
    beforeEach(() => {
      element.saveTimesheet({preventDefault: _.noop});
    });

    it('should validate the entire timesheet', () => {
      expect(spies.validateAll).to.have.been.called;
    });

    describe('and the timesheet passes validation', () => {
      beforeEach(() => {
        spies.hasErrors = sinon.stub(element, 'hasErrors').returns(false);
      });

      afterEach(() => {
        spies.hasErrors.restore();
      });

      it('should fire an update action', () => {
        expect(proxies['../../actions/timesheet.actions'].update).to.have.been.called;
      });

      it('should transition back to the timesheet list', () => { 
        expect(spies.transitionTo).to.have.been.calledWith('timesheets');
      });
    });
  });
});
