let _ from 'lodash');

describe('Timesheet Table Component: ', function () {

  let TimesheetTable,
    TimesheetStore,
    timesheets,
    element,
    spies = {},
    proxies;

  let React, TestUtils;

  beforeEach(function () {
    React from 'react/addons');
    TestUtils = React.addons.TestUtils;
    TimesheetStore from '../../stores/timesheet.store');
  });

  beforeEach(function () {
    timesheets = [{}, {}];

    TimesheetTable from './timesheet.table');
    element = TestUtils.renderIntoDocument(
      <TimesheetTable timesheets={timesheets} store={TimesheetStore} />
    );
  });

  it('should instantiate the TimesheetTable', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });
});
