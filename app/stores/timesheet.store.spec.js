describe('Timesheet Store: ', () => {

  let TimesheetStore;

  beforeEach(() => {
    TimesheetStore = require('./timesheet.store');
  });

  it('should instantiate the TimesheetStore', () => {
    expect(TimesheetStore).to.be.defined;
  });
});
