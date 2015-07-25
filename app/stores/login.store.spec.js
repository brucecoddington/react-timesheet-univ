describe('Login Store: ', () => {

  let LoginStore;

  beforeEach(() => {
    LoginStore = require('./login.store');
  });

  it('should instantiate the LoginStore', () => {
    expect(LoginStore).to.be.defined;
  });
});
