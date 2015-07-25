describe('Project Store: ', () => {

  let ProjectStore;

  beforeEach(() => {
    ProjectStore = require('./project.store');
  });

  it('should instantiate the ProjectStore', () => {
    expect(ProjectStore).to.be.defined;
  });
});
