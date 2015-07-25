let _ from 'lodash');

describe('Timeunits Component: ', () => {

  let Timeunits,
    timesheet,
    element,
    spies = {},
    proxies;

  let React, TestUtils;

  beforeEach(() => {
    React from 'react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(() => {
    Timeunits from './timeunits');

    timesheet = {_id: 'timesheetId'};

    element = TestUtils.renderIntoDocument(<Timeunits timesheet={timesheet}/>);
    
    spies.transitionTo = sinon.stub(element, 'transitionTo');
    spies.getParams = sinon.stub(element, 'getParams').returns(
      {user_id: 'userId', _id: 'timesheetId', timeunit_id: 'timeunitId'});
  });

  afterEach(() => {
    spies.transitionTo.restore();
  });

  it('should instantiate the Timeunits', () => {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('clicking the new employee button', () => {
    it('should transition to the create employee route', () => {
      let button = TestUtils.findRenderedDOMComponentWithTag(element, 'button');
      TestUtils.Simulate.click(button);
      
      expect(spies.transitionTo).to.have.been.calledWith('timesheets.detail.timeunits.create', {
        user_id: 'userId', _id: 'timesheetId', timeunit_id: 'timeunitId'});
    });
  });
});
