describe('Notifications Store: ', () => {

  let SnackbarStore;

  beforeEach(() => {
    SnackbarStore = require('./snackbar.store');
  });

  it('should instantiate the SnackbarStore', () => {
    expect(SnackbarStore).to.be.defined;
  });
});
