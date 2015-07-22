let _ from 'lodash');

describe('Cancel Button: ', function () {

  let CancelButton,
    element,
    testCtrl,
    spies = {};

  let React, TestUtils;

  beforeEach(function () {
    React from 'react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(function () {
    CancelButton from './cancel.button');
    testCtrl = { onCancel: _.noop };
    spies.cancel = sinon.spy(testCtrl, 'onCancel');

    element = TestUtils.renderIntoDocument(
      <CancelButton onCancel={testCtrl.onCancel} />
    );
  });

  afterEach(function () {
    spies.cancel.restore();
  });

  it('should instantiate the CancelButton', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('clicking the button', function () {
    it('should call the callback', function () {
      let button = TestUtils.findRenderedDOMComponentWithTag(element, 'button');
      TestUtils.Simulate.click(button);
      expect(spies.cancel).to.have.been.called;
    });
  });
});
