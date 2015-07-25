import loginHandler from '../handlers/login';
import logoutHandler from '../handlers/logout';

exports.register = (server, options, next) => {

  const login = '/api/login';
  const logout = '/api/logout';

  server.route([
    {method: 'POST', path: login, config: {handler: loginHandler.login, auth: false}},
    {method: 'GET',  path: login,  config: {handler: loginHandler.index, auth: false}},
    {method: 'POST',  path: logout, config: {handler: logoutHandler.logout, auth:false}}
  ]);

  return next();
};

exports.register.attributes = {
  name: 'auth-routes',
  version: '0.0.1'
};
