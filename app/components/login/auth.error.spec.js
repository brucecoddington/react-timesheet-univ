let proxyquire from 'proxyquireify')(require);
let mockComponent from '../mock');let _ from 'lodash');

describe('Auth Error Component: ', function () {

  let AuthError,
    element,
    spies,
    proxies;

  let React, TestUtils;

  beforeEach(function () {
    React from 'react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(function () {
    AuthError from './auth.error');
    element = TestUtils.renderIntoDocument(<AuthError authError="none" />);
  });

  it('should instantiate the AuthError', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });
});
