let proxyquire = require('proxyquireify')(require);
let _ = require('lodash');

describe('Flux Store: ', () => {

  let FluxStore;

  beforeEach(() => {
    FluxStore = require('./flux.store');
  });

  it('should instantiate the FluxStore', () => {
    expect(FluxStore).to.be.defined;
  });
});
