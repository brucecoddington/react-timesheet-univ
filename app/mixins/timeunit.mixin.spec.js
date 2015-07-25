describe('Timeunit Mixin: ', () => {

  var TimeunitMixin;

  beforeEach(() => {
    TimeunitMixin = require('./timeunit.mixin');
  });

  it('should instantiate the TimeunitMixin', () => {
    expect(TimeunitMixin).to.be.defined;
  });
});
