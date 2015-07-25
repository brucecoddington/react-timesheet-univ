let _ from 'lodash');

describe('Save Button: ', () => {

  let SaveButton,
    element,
    button,
    testCtrl,
    spies = {};

  let React, TestUtils

  beforeEach(() => {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(() => {
    SaveButton = require('./save.button');
    testCtrl = { onSave: _.noop };
    spies.save = sinon.spy(testCtrl, 'onSave');

    element = TestUtils.renderIntoDocument(
      <SaveButton saveText="phrasing" hasErrors="true"/>
    );

    button = TestUtils.findRenderedDOMComponentWithTag(element, 'button');
  });

  afterEach(() => {
    spies.save.restore();
  });

  it('should instantiate the SaveButton', () => {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  it('should set the text on the button', () => {
    expect(button.getDOMNode().innerText).to.equal('phrasing');
  });

  describe('when the form has errors', () => {
    it('should disable the button', () => {
      expect(button.getDOMNode().disabled).to.be.true;
    });
  });
});
