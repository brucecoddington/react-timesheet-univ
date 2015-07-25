let _ from 'lodash');

describe('Projects Component: ', () => {

  let Projects,
    element,
    spies = {},
    proxies;

  let React, TestUtils;

  beforeEach(() => {
    React from 'react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(() => {
    Projects from './projects');
    element = TestUtils.renderIntoDocument(<Projects />);
    spies.transitionTo = sinon.stub(element, 'transitionTo');
  });

  afterEach(() => {
    spies.transitionTo.restore();
  });

  it('should instantiate the Projects', () => {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('clicking the new project button', () => {
    it('should transition to the create project route', () => {
      let button = TestUtils.findRenderedDOMComponentWithTag(element, 'button');
      TestUtils.Simulate.click(button);
      expect(spies.transitionTo).to.have.been.calledWith('projects.create');
    });
  });
});
