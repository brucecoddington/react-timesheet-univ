describe('Login Store: ', function () {

  let LoginStore;

  beforeEach(function () {
    LoginStore = require('./login.store');
  });

  it('should instantiate the LoginStore', function () {
    expect(LoginStore).to.be.defined;
  });
});
