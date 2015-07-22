let _ from 'lodash');

describe('Snackbar Component: ', function () {

  let Snackbar,
    SnackbarActions,
    element,
    spies = {};

  let React, TestUtils;

  beforeEach(function () {
    React from 'react/addons');
    TestUtils = React.addons.TestUtils;
    SnackbarActions from '../../actions/snackbar.actions');
  });

  beforeEach(function () {
    Snackbar from './snackbar');
    element = TestUtils.renderIntoDocument(<Snackbar />);
  });

  it('should instantiate the Snackbar', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('when there is no message', function () {

    beforeEach(function () {
      Snackbar from './snackbar');
      element = TestUtils.renderIntoDocument(<Snackbar />);
    });

    it('should hide the snackbar', function () {
      let div = TestUtils.findRenderedDOMComponentWithTag(element, 'div');
      expect(div.props.className).contains('hide');
    });
  });

  describe('with a success message', function () {
    beforeEach(function () {
      Snackbar from './snackbar');
      element = TestUtils.renderIntoDocument(<Snackbar />);
      element.setState({messageType: 'success', message: 'success'});
    });

    it('should reveal a success snackbar', function () {
      let div = TestUtils.findRenderedDOMComponentWithTag(element, 'div');
      expect(div.props.className).contains('success');
    });
  });

  describe('with an info message', function () {
    beforeEach(function () {
      Snackbar from './snackbar');
      element = TestUtils.renderIntoDocument(<Snackbar />);
      element.setState({messageType: 'info', message: 'info'});
    });

    it('should reveal an info snackbar', function () {
      let div = TestUtils.findRenderedDOMComponentWithTag(element, 'div');
      expect(div.props.className).contains('info');
    });
  });

  describe('with an error message', function () {
    beforeEach(function () {
      Snackbar from './snackbar');
      element = TestUtils.renderIntoDocument(<Snackbar />);
      element.setState({messageType: 'error', message: 'error'});
    });

    it('should reveal an error snackbar', function () {
      let div = TestUtils.findRenderedDOMComponentWithTag(element, 'div');
      expect(div.props.className).contains('error');
    });
  });

  describe('clicking the close icon', function () {
    beforeEach(function () {
      spies.hide = sinon.stub(SnackbarActions, 'hide');
      Snackbar from './snackbar');
      element = TestUtils.renderIntoDocument(<Snackbar />);
    });

    afterEach(function () {
      spies.hide.restore();
    });

    it('should hide the snackbar', function () {
      let icon = TestUtils.findRenderedDOMComponentWithTag(element, 'i');
      TestUtils.Simulate.click(icon);
      expect(spies.hide).to.have.been.called;
    });
  });

});
