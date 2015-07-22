let _ from 'lodash');

describe('Timeunits Component: ', function () {

  let Timeunits,
    timesheet,
    element,
    spies = {},
    proxies;

  let React, TestUtils;

  beforeEach(function () {
    React from 'react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(function () {
    Timeunits from './timeunits');

    timesheet = {_id: 'timesheetId'};

    element = TestUtils.renderIntoDocument(<Timeunits timesheet={timesheet}/>);
    
    spies.transitionTo = sinon.stub(element, 'transitionTo');
    spies.getParams = sinon.stub(element, 'getParams').returns(
      {user_id: 'userId', _id: 'timesheetId', timeunit_id: 'timeunitId'});
  });

  afterEach(function () {
    spies.transitionTo.restore();
  });

  it('should instantiate the Timeunits', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('clicking the new employee button', function () {
    it('should transition to the create employee route', function () {
      let button = TestUtils.findRenderedDOMComponentWithTag(element, 'button');
      TestUtils.Simulate.click(button);
      
      expect(spies.transitionTo).to.have.been.calledWith('timesheets.detail.timeunits.create', {
        user_id: 'userId', _id: 'timesheetId', timeunit_id: 'timeunitId'});
    });
  });
});
