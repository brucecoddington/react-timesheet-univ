let _ from 'lodash');

describe('Cancel Button: ', () => {

  let CancelButton,
    element,
    testCtrl,
    spies = {};

  let React, TestUtils;

  beforeEach(() => {
    React from 'react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(() => {
    CancelButton from './cancel.button');
    testCtrl = { onCancel: _.noop };
    spies.cancel = sinon.spy(testCtrl, 'onCancel');

    element = TestUtils.renderIntoDocument(
      <CancelButton onCancel={testCtrl.onCancel} />
    );
  });

  afterEach(() => {
    spies.cancel.restore();
  });

  it('should instantiate the CancelButton', () => {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('clicking the button', () => {
    it('should call the callback', () => {
      let button = TestUtils.findRenderedDOMComponentWithTag(element, 'button');
      TestUtils.Simulate.click(button);
      expect(spies.cancel).to.have.been.called;
    });
  });
});
