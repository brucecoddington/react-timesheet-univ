let _ from 'lodash');
let proxyquire from 'proxyquireify')(require);
let mockComponent from '../mock');

describe('Employee Detail Component: ', () => {

  let EmployeeDetail,
    element,
    spies = {},
    proxies;

  let React, TestUtils;

  beforeEach(() => {
    React from 'react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(() => {
    proxies = {
      './employee.form': mockComponent('EmployeeForm'),
      '../../actions/employee.actions': {
        get: sinon.stub(),
        update: sinon.stub()
      },
      'react-router': {
        RouteHandler: mockComponent('RouteHandler'),
        Link: mockComponent('Link'),
        State: {
          getParams () {return {_id: 'abc123'}}
        }
      }
    };

    EmployeeDetail = proxyquire('./employee.detail', proxies);
    element = TestUtils.renderIntoDocument(<EmployeeDetail />);

    spies.transitionTo = sinon.stub(element, 'transitionTo');
    spies.validateAll = sinon.stub(element, 'validateAll');
  });

  afterEach(() => {
    spies.transitionTo.restore();
    spies.validateAll.restore();
  });

  it('should instantiate the EmployeeDetail', () => {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('getting the employee', () => {
    describe('and the employee exists on the store state', () => {
      beforeEach(() => {
        element.store.state.employee = {_id: 'abc123'};
        element.get();
      });

      it('should set the employee on the component state', () => {
        expect(element.state.employee._id).to.equal('abc123');
      });
    });

    describe('and the employee does NOT exist in the stored state', () => {
      beforeEach(() => {
        element.get();
      });

      it('should fire a get employee action', () => {
        expect(proxies['../../actions/employee.actions'].get).to.have.been.calledWith('abc123');
      });
    });
  });

  describe('saving an employee', () => {
    beforeEach(() => {
      element.saveEmployee({preventDefault: _.noop});
    });

    it('should validate the entire employee', () => {
      expect(spies.validateAll).to.have.been.called;
    });

    describe('and the employee passes validation', () => {
      beforeEach(() => {
        spies.hasErrors = sinon.stub(element, 'hasErrors').returns(false);
      });

      afterEach(() => {
        spies.hasErrors.restore();
      });

      it('should fire an update action', () => {
        expect(proxies['../../actions/employee.actions'].update).to.have.been.called;
      });

      it('should transition back to the employee list', () => { 
        expect(spies.transitionTo).to.have.been.calledWith('employees');
      });
    });
  });
});
