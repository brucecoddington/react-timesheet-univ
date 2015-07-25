describe('Timesheet Mixin: ', () => {
  
  var Timesheet;

  beforeEach(() => {
    Timesheet = require('./timesheet.mixin');
  });

  it('should instantiate the Timesheet', () => {
    expect(Timesheet).to.be.defined;
  });
});
