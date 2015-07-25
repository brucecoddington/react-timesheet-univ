describe('Employee Mixin: ', () => {

  var Employee;

  beforeEach(() => {
    Employee = require('./employee.mixin');
  });

  it('should instantiate the Employee', () => {
    expect(Employee).to.be.defined;
  });
});
