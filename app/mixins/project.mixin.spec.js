describe('Project Mixin: ', () => {

  var Project;

  beforeEach(() => {
    Project = require('./project.mixin');
  });

  it('should instantiate the Project', () => {
    expect(Project).to.be.defined;
  });
});
