let _ from 'lodash');

describe('Project Table Component: ', function () {

  let ProjectTable,
    ProjectStore,
    projects,
    element,
    spies = {},
    proxies;

  let React, TestUtils;

  beforeEach(function () {
    React from 'react/addons');
    TestUtils = React.addons.TestUtils;
    ProjectStore from '../../stores/project.store');
  });

  beforeEach(function () {
    projects = [{}, {}];

    ProjectTable from './project.table');
    element = TestUtils.renderIntoDocument(
      <ProjectTable projects={projects} store={ProjectStore} />
    );
  });

  it('should instantiate the ProjectTable', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });
});
