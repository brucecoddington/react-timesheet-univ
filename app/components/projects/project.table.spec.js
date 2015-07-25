let _ from 'lodash');

describe('Project Table Component: ', () => {

  let ProjectTable,
    ProjectStore,
    projects,
    element,
    spies = {},
    proxies;

  let React, TestUtils;

  beforeEach(() => {
    React from 'react/addons');
    TestUtils = React.addons.TestUtils;
    ProjectStore from '../../stores/project.store');
  });

  beforeEach(() => {
    projects = [{}, {}];

    ProjectTable from './project.table');
    element = TestUtils.renderIntoDocument(
      <ProjectTable projects={projects} store={ProjectStore} />
    );
  });

  it('should instantiate the ProjectTable', () => {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });
});
