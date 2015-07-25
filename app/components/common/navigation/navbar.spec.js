let _ from 'lodash');
let proxyquire from 'proxyquireify')(require);
let mockComponent from '../../mock');

describe('Navbar Component: ', () => {

  let Navbar,
    element,
    proxies;

  let React, TestUtils;

  beforeEach(() => {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(() => {
    proxies = {
      '../../../stores/login.store': {
        getState: sinon.stub().returns({user: {_id: 'abc123'}}),
        addChangeListener: sinon.stub(),
        removeChangeListener: sinon.stub()
      },
      '../../../actions/login.actions': {
        logout: sinon.stub()
      },
      'react-router': {
        RouteHandler: mockComponent('RouteHandler'),
        Link: mockComponent('Link'),
        State: {
          getRoutes: sinon.stub().returns([{name: 'projects'}])
        }
      },
      '@noCallThru': true
    };

    Navbar = proxyquire('./navbar', proxies);
    element = TestUtils.renderIntoDocument(<Navbar />);
  });

  it('should instantiate the Navbar', () => {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('when navigating between routes', () => {
    it('should set the appropriate active class', () => {
      let Links = TestUtils.scryRenderedComponentsWithType(element, proxies['react-router'].Link);
      let projectLink = TestUtils.findRenderedDOMComponentWithClass(element, 'active');
      expect(projectLink.getDOMNode().innerText).to.equal('Projects');
    });
  });
});
