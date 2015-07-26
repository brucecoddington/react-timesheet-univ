let _ from 'lodash');

describe('Employees Component: ', () => {

  let Employees,
    element,
    spies = {},
    proxies;

  let React, TestUtils;

  beforeEach(() => {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(() => {
    Employees = require('./employees');
    element = TestUtils.renderIntoDocument(<Employees />);
    spies.transitionTo = sinon.stub(element, 'transitionTo');
  });

  afterEach(() => {
    spies.transitionTo.restore();
  });

  it('should instantiate the Employees', () => {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('clicking the new employee button', () => {
    it('should transition to the create employee route', () => {
      let button = TestUtils.findRenderedDOMComponentWithTag(element, 'button');
      TestUtils.Simulate.click(button);
      expect(spies.transitionTo).to.have.been.calledWith('/employees/create');
    });
  });
});
