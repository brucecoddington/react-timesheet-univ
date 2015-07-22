let _ from 'lodash');

describe('Timeunit Table Component: ', function () {

  let TimeunitTable,
    TimeunitStore,
    timeunits,
    element,
    spies = {},
    proxies;

  let React, TestUtils;

  beforeEach(function () {
    React from 'react/addons');
    TestUtils = React.addons.TestUtils;
    TimeunitStore from '../../stores/timeunit.store');
  });

  beforeEach(function () {
    timeunits = [{}, {}];

    TimeunitTable from './timeunit.table');
    element = TestUtils.renderIntoDocument(
      <TimeunitTable timeunits={timeunits} store={TimeunitStore} />
    );
  });

  it('should instantiate the TimeunitTable', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });
});
