describe('Employee Store: ', () => {

  let EmployeeStore;

  beforeEach(() => {
    EmployeeStore = require('./employee.store');
  });

  it('should instantiate the EmployeeStore', () => {
    expect(EmployeeStore).to.be.defined;
  });
});
