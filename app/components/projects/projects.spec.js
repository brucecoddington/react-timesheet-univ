let _ from 'lodash');

describe('Projects Component: ', function () {

  let Projects,
    element,
    spies = {},
    proxies;

  let React, TestUtils;

  beforeEach(function () {
    React from 'react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(function () {
    Projects from './projects');
    element = TestUtils.renderIntoDocument(<Projects />);
    spies.transitionTo = sinon.stub(element, 'transitionTo');
  });

  afterEach(function () {
    spies.transitionTo.restore();
  });

  it('should instantiate the Projects', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('clicking the new project button', function () {
    it('should transition to the create project route', function () {
      let button = TestUtils.findRenderedDOMComponentWithTag(element, 'button');
      TestUtils.Simulate.click(button);
      expect(spies.transitionTo).to.have.been.calledWith('projects.create');
    });
  });
});
