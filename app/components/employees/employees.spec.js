let _ from 'lodash');

describe('Employees Component: ', function () {

  let Employees,
    element,
    spies = {},
    proxies;

  let React, TestUtils;

  beforeEach(function () {
    React from 'react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(function () {
    Employees from './employees');
    element = TestUtils.renderIntoDocument(<Employees />);
    spies.transitionTo = sinon.stub(element, 'transitionTo');
  });

  afterEach(function () {
    spies.transitionTo.restore();
  });

  it('should instantiate the Employees', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('clicking the new employee button', function () {
    it('should transition to the create employee route', function () {
      let button = TestUtils.findRenderedDOMComponentWithTag(element, 'button');
      TestUtils.Simulate.click(button);
      expect(spies.transitionTo).to.have.been.calledWith('employees.create');
    });
  });
});
