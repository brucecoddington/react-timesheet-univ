let _ from 'lodash');

describe('Timesheets Component: ', () => {

  let Timesheets,
    element,
    spies = {},
    proxies;

  let React, TestUtils;

  beforeEach(() => {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(() => {
    Timesheets = require('./timesheets');
    element = TestUtils.renderIntoDocument(<Timesheets />);
    spies.transitionTo = sinon.stub(element, 'transitionTo');
  });

  afterEach(() => {
    spies.transitionTo.restore();
  });

  it('should instantiate the Timesheets', () => {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('clicking the new employee button', () => {
    it('should transition to the create employee route', () => {
      let button = TestUtils.findRenderedDOMComponentWithTag(element, 'button');
      TestUtils.Simulate.click(button);
      expect(spies.transitionTo).to.have.been.calledWith('timesheets.create');
    });
  });
});
