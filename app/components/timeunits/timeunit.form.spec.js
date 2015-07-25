let _ from 'lodash');

describe('Timeunit Form Component: ', () => {

  let TimeunitForm,
    CancleButton,
    timeunit,
    errors,
    element,
    spies = {};

  let React, TestUtils;

  beforeEach(() => {
    React from 'react/addons');
    TestUtils = React.addons.TestUtils;
    CancelButton from '../common/buttons/cancel.button');
  });

  beforeEach(() => {
    timeunit =  {};
    errors = {};

    spies.validate = sinon.stub();
    spies.hasErrors = sinon.stub();
    spies.toggleAdmin = sinon.stub();
    spies.onSave = sinon.stub();

    TimeunitForm from './timeunit.form');
    element = TestUtils.renderIntoDocument(
      <TimeunitForm timeunit={timeunit}
        errors={errors}
        validate={spies.validate}
        hasErrors={spies.hasErrors}
        toggleAdmin={spies.toggleAdmin}
        onSave={spies.onSave} />
    );

    spies.transitionTo = sinon.stub(element, 'transitionTo');
    spies.getParams = sinon.stub(element, 'getParams').returns({user_id: 'userId', _id: 'timesheetId'});
  });

  afterEach(() => {
    spies.transitionTo.restore();
    spies.getParams.restore();
  });

  it('should instantiate the TimeunitForm', () => {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('clicking the cancel button', () => {
    it('should go back to the timeunits home', () => {
      let cancel = TestUtils.findRenderedComponentWithType(element, CancelButton);
      let button = TestUtils.findRenderedDOMComponentWithTag(cancel, 'button');
      TestUtils.Simulate.click(button);

      expect(spies.transitionTo).to.have.been.calledWith('timesheets.detail', { _id: 'timesheetId', user_id: "userId" });
    });
  });
});
