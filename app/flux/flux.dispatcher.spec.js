let proxyquire = require('proxyquireify')(require);
let _ = require('lodash');

describe('Flux Dispatcher: ', () => {

  let dispatcher,
    spies,
    proxies;

  beforeEach(() => {

    proxies = {
      'flux': {
        Dispatcher: () => {
          this.dispatch = _.noop;
        }
      }
    };
    proxyquire('./flux.dispatcher', proxies);

    dispatcher = require('./flux.dispatcher');

    spies = {
      dispatch: sinon.spy(dispatcher, 'dispatch')
    };
  });

  afterEach(() => {
    spies.dispatch.restore();
  });

  it('should instantiate the dispatcher', () => {
    expect(dispatcher).to.be.defined;
  });

  describe('handling a view action', () => {
    it('should dispatch the action with a source of VIEW_ACTION', () => {
      dispatcher.handleViewAction('testAction');
      expect(spies.dispatch).to.have.been.calledWith({source: 'VIEW_ACTION', action: 'testAction'});
    });
  });
});
