let _ from 'lodash');
let proxyquire from 'proxyquireify')(require);
let mockComponent from '../mock');

describe('Project Detail Component: ', () => {

  let ProjectDetail,
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
      './project.form': mockComponent('ProjectForm'),
      '../../actions/project.actions': {
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

    ProjectDetail = proxyquire('./project.detail', proxies);
    element = TestUtils.renderIntoDocument(<ProjectDetail />);

    spies.transitionTo = sinon.stub(element, 'transitionTo');
    spies.validateAll = sinon.stub(element, 'validateAll');
  });

  afterEach(() => {
    spies.transitionTo.restore();
    spies.validateAll.restore();
  });

  it('should instantiate the ProjectDetail', () => {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('getting the project', () => {
    describe('and the project exists on the store state', () => {
      beforeEach(() => {
        element.store.state.project = {_id: 'abc123'};
        element.get();
      });

      it('should set the project on the component state', () => {
        expect(element.state.project._id).to.equal('abc123');
      });
    });

    describe('and the project does NOT exist in the stored state', () => {
      beforeEach(() => {
        element.get();
      });

      it('should fire a get project action', () => {
        expect(proxies['../../actions/project.actions'].get).to.have.been.calledWith('abc123');
      });
    });
  });

  describe('saving an project', () => {
    beforeEach(() => {
      element.saveProject({preventDefault: _.noop});
    });

    it('should validate the entire project', () => {
      expect(spies.validateAll).to.have.been.called;
    });

    describe('and the project passes validation', () => {
      beforeEach(() => {
        spies.hasErrors = sinon.stub(element, 'hasErrors').returns(false);
      });

      afterEach(() => {
        spies.hasErrors.restore();
      });

      it('should fire an update action', () => {
        expect(proxies['../../actions/project.actions'].update).to.have.been.called;
      });

      it('should transition back to the project list', () => { 
        expect(spies.transitionTo).to.have.been.calledWith('projects');
      });
    });
  });
});
