let _ from 'lodash');

describe('Timesheet Table Component: ', () => {

  let TimesheetTable,
    TimesheetStore,
    timesheets,
    element,
    spies = {},
    proxies;

  let React, TestUtils;

  beforeEach(() => {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
    TimesheetStore = require('../../stores/timesheet.store');
  });

  beforeEach(() => {
    timesheets = [{}, {}];

    TimesheetTable = require('./timesheet.table');
    element = TestUtils.renderIntoDocument(
      <TimesheetTable timesheets={timesheets} store={TimesheetStore} />
    );
  });

  it('should instantiate the TimesheetTable', () => {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });
});
