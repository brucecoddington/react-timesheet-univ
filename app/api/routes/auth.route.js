'use strict';

let loginHandler = require('../handlers/login'),
  logoutHandler = require('../handlers/logout');

exports.register = function (server, options, next) {

  let login = '/api/login';
  let logout = '/api/logout';

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
