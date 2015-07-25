let _ from 'lodash');
let proxyquire from 'proxyquireify')(require);
let mockComponent from '../mock');

describe('Timeunit Detail Component: ', () => {

  let TimeunitDetail,
    element,
    spies = {},
    proxies;

  let React, TestUtils;

  beforeEach(() => {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(() => {
    proxies = {
      './timeunit.form': mockComponent('TimeunitForm'),
      '../../actions/timeunit.actions': {
        get: sinon.stub(),
        update: sinon.stub()
      },
      'react-router': {
        RouteHandler: mockComponent('RouteHandler'),
        Link: mockComponent('Link'),
        State: {
          getParams: sinon.stub().returns({_id: 'abc123', timeunit_id: 'tuId', user_id: 'userId'})
        }
      }
    };

    TimeunitDetail = proxyquire('./timeunit.detail', proxies);
    element = TestUtils.renderIntoDocument(<TimeunitDetail />);

    spies.transitionTo = sinon.stub(element, 'transitionTo');
    spies.validateAll = sinon.stub(element, 'validateAll');
  });

  afterEach(() => {
    spies.transitionTo.restore();
    spies.validateAll.restore();
  });

  it('should instantiate the TimeunitDetail', () => {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('getting the timeunit', () => {
    describe('and the timeunit exists on the store state', () => {
      beforeEach(() => {
        element.store.state.timeunit = {_id: 'abc123'};
        element.get();
      });

      it('should set the timeunit on the component state', () => {
        expect(element.state.timeunit._id).to.equal('abc123');
      });
    });

    describe('and the timeunit does NOT exist in the stored state', () => {
      beforeEach(() => {
        element.get('abc123', 'tuId');
      });

      it('should fire a get timeunit action', () => {
        expect(proxies['../../actions/timeunit.actions'].get).to.have.been.called;
      });
    });
  });

  describe('saving an timeunit', () => {
    beforeEach(() => {
      element.saveTimeunit({preventDefault: _.noop});
    });

    it('should validate the entire timeunit', () => {
      expect(spies.validateAll).to.have.been.called;
    });

    describe('and the timeunit passes validation', () => {
      beforeEach(() => {
        spies.hasErrors = sinon.stub(element, 'hasErrors').returns(false);
      });

      afterEach(() => {
        spies.hasErrors.restore();
      });

      it('should fire an update action', () => {
        expect(proxies['../../actions/timeunit.actions'].update).to.have.been.called;
      });

      it('should transition back to the timeunit list', () => { 
        expect(spies.transitionTo).to.have.been.calledWith('timesheets.detail', { _id: "abc123", user_id: "userId" });
      });
    });
  });
});
