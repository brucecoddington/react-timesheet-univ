let _ from 'lodash');
let proxyquire from 'proxyquireify')(require);
let mockComponent from '../mock');

describe('Timeunit Create Component: ', () => {

  let TimeunitCreate,
    element,
    proxies,
    spies = {};

  let React, TestUtils;

  beforeEach(() => {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(() => {
    proxies = {
      '../../actions/timeunit.actions': {
        create: sinon.stub()
      },
      './timeunit.form': mockComponent('TimeunitForm'),
      'react-router': {
        State: {
          getParams: sinon.stub().returns({user_id: 'userId', _id: 'abc123'})
        }
      }
    };

    TimeunitCreate = proxyquire('./timeunit.create', proxies);
    element = TestUtils.renderIntoDocument(<TimeunitCreate />);

    spies.transitionTo = sinon.stub(element, 'transitionTo');
    spies.validateAll = sinon.stub(element, 'validateAll');
  });

  afterEach(() => {
    spies.validateAll.restore();
    spies.transitionTo.restore();
  });

  it('should instantiate the TimeunitCreate', () => {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('saving a timeunit', () => {
    beforeEach(() => {
      element.saveTimeunit({preventDefault: _.noop});
    });

    it('should validate the entire timeunit', () => {
      expect(spies.validateAll).to.have.been.called;
    });

    describe('when the timeunit passes validation', () => {
      beforeEach(() => {
        spies.hasErrors = sinon.stub(element, 'hasErrors').returns(false);
      });

      afterEach(() => {
        spies.hasErrors.restore();
      });

      it('should fire a create action', () => {
        expect(proxies['../../actions/timeunit.actions'].create).to.have.been.called;
      });

      it('should transition back to the timesheet detail for the timeunit', () => {
        expect(spies.transitionTo).to.have.been.calledWith('/employees/userId/timesheets/abc123');
      });
    });
  });
});
