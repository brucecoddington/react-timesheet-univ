describe('Timeunit Store: ', () => {

  let TimeunitStore;

  beforeEach(() => {
    TimeunitStore = require('./timeunit.store');
  });

  it('should instantiate the TimeunitStore', () => {
    expect(TimeunitStore).to.be.defined;
  });
});
