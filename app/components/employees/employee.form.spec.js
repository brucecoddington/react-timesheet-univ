let _ from 'lodash');

describe('Employee Form Component: ', () => {

  let EmployeeForm,
    CancleButton,
    employee,
    errors,
    element,
    spies = {},
    proxies;

  let React, TestUtils;

  beforeEach(() => {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
    CancelButton from '../common/buttons/cancel.button');
  });

  beforeEach(() => {
    employee =  {};
    errors = {};

    spies.validate = sinon.stub();
    spies.hasErrors = sinon.stub();
    spies.toggleAdmin = sinon.stub();
    spies.onSave = sinon.stub();

    EmployeeForm = require('./employee.form');
    element = TestUtils.renderIntoDocument(
      <EmployeeForm employee={employee}
        errors={errors}
        validate={spies.validate}
        hasErrors={spies.hasErrors}
        toggleAdmin={spies.toggleAdmin}
        onSave={spies.onSave} />
    );

    spies.transitionTo = sinon.stub(element, 'transitionTo');
  });

  afterEach(() => {
    spies.transitionTo.restore();
  });

  it('should instantiate the EmployeeForm', () => {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('clicking the cancel button', () => {
    it('should go back to the employees home', () => {
      let cancel = TestUtils.findRenderedComponentWithType(element, CancelButton);
      let button = TestUtils.findRenderedDOMComponentWithTag(cancel, 'button');
      TestUtils.Simulate.click(button);

      expect(spies.transitionTo).to.have.been.calledWith('employees');
    });
  });
});
