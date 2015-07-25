let proxyquire from 'proxyquireify')(require);
let mockComponent from '../mock');let _ from 'lodash');

describe('Auth Error Component: ', () => {

  let AuthError,
    element,
    spies,
    proxies;

  let React, TestUtils;

  beforeEach(() => {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(() => {
    AuthError = require('./auth.error');
    element = TestUtils.renderIntoDocument(<AuthError authError="none" />);
  });

  it('should instantiate the AuthError', () => {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });
});
