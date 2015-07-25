let _ from 'lodash');

describe('Employee Table Component: ', () => {

  let EmployeeTable,
    EmployeeStore,
    employees,
    element,
    spies = {},
    proxies;

  let React, TestUtils;

  beforeEach(() => {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
    EmployeeStore = require('../../stores/employee.store');
  });

  beforeEach(() => {
    employees = [{}, {}];

    EmployeeTable from './employee.table');
    element = TestUtils.renderIntoDocument(
      <EmployeeTable employees={employees} store={EmployeeStore} />
    );
  });

  it('should instantiate the EmployeeTable', () => {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });
});
