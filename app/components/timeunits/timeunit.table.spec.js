let _ from 'lodash');

describe('Timeunit Table Component: ', () => {

  let TimeunitTable,
    TimeunitStore,
    timeunits,
    element,
    spies = {},
    proxies;

  let React, TestUtils;

  beforeEach(() => {
    React from 'react/addons');
    TestUtils = React.addons.TestUtils;
    TimeunitStore from '../../stores/timeunit.store');
  });

  beforeEach(() => {
    timeunits = [{}, {}];

    TimeunitTable from './timeunit.table');
    element = TestUtils.renderIntoDocument(
      <TimeunitTable timeunits={timeunits} store={TimeunitStore} />
    );
  });

  it('should instantiate the TimeunitTable', () => {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });
});
