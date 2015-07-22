let _ from 'lodash');

describe('Employee Table Component: ', function () {

  let EmployeeTable,
    EmployeeStore,
    employees,
    element,
    spies = {},
    proxies;

  let React, TestUtils;

  beforeEach(function () {
    React from 'react/addons');
    TestUtils = React.addons.TestUtils;
    EmployeeStore from '../../stores/employee.store');
  });

  beforeEach(function () {
    employees = [{}, {}];

    EmployeeTable from './employee.table');
    element = TestUtils.renderIntoDocument(
      <EmployeeTable employees={employees} store={EmployeeStore} />
    );
  });

  it('should instantiate the EmployeeTable', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });
});
