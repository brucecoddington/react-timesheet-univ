let _ from 'lodash');

describe('Employee Create Component: ', () => {

  let EmployeeCreate,
    element,
    spies = {},
    proxies;

  let React, TestUtils;

  beforeEach(() => {
    React from 'react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(() => {
    EmployeeCreate from './employee.create');
    EmployeeActions from '../../actions/employee.actions');

    element = TestUtils.renderIntoDocument(<EmployeeCreate />);

    spies.transitionTo = sinon.stub(element, 'transitionTo');
    spies.validateAll = sinon.stub(element, 'validateAll');
    spies.create = sinon.stub(EmployeeActions, 'create');
  });

  afterEach(() => {
    spies.validateAll.restore();
    spies.transitionTo.restore();
    spies.create.restore();
  });

  it('should instantiate the EmployeeCreate', () => {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('saving an employee', () => {
    beforeEach(() => {
      element.saveEmployee({preventDefault: _.noop});
    });

    it('should validate the entire employee', () => {
      expect(spies.validateAll).to.have.been.called;
    });

    describe('when the employee passes validation', () => {
      beforeEach(() => {
        spies.hasErrors = sinon.stub(element, 'hasErrors').returns(false);
      });

      afterEach(() => {
        spies.hasErrors.restore();
      });

      it('should fire a create action', () => {
        expect(spies.create).to.have.been.called;
      });

      it('should transition back to the employee list', () => {
        expect(spies.transitionTo).to.have.been.calledWith('employees');
      });
    });
  });
});
