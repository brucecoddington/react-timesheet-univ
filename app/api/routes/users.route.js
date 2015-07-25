import usersController from '../handlers/users';
import timesheetsController from '../handlers/timesheets';
import timeunitsController from '../handlers/timeunits';

exports.register = function (server, options, next) {

  const users =         '/api/users';
  const userId =        '/api/users/{userId}';
  const timesheets =    '/api/users/{userId}/timesheets';
  const timesheetId =   '/api/users/{userId}/timesheets/{timesheetId}';
  const timeunits =     '/api/users/{userId}/timesheets/{timesheetId}/timeunits';
  const timeunitId =    '/api/users/{userId}/timesheets/{timesheetId}/timeunits/{timeunitId}';

  server.route([
    {method: 'GET',     path: users, handler: usersController.index},
    {method: 'POST',    path: users, handler: usersController.create},
    {method: 'GET',     path: userId, handler: usersController.show},
    {method: 'PUT',     path: userId, handler: usersController.update},
    {method: 'DELETE',  path: userId, handler: usersController.destroy}
  ]);

  server.route([
    {method: 'GET',     path: timesheets, handler: timesheetsController.index},
    {method: 'POST',    path: timesheets, handler: timesheetsController.create},
    {method: 'GET',     path: timesheetId, handler: timesheetsController.show},
    {method: 'PUT',     path: timesheetId, handler: timesheetsController.update},
    {method: 'DELETE',  path: timesheetId, handler: timesheetsController.destroy}
  ]);

  server.route([
    {method: 'GET',     path: timeunits, handler: timeunitsController.index},
    {method: 'POST',    path: timeunits, handler: timeunitsController.create},
    {method: 'GET',     path: timeunitId, handler: timeunitsController.show},
    {method: 'PUT',     path: timeunitId, handler: timeunitsController.update},
    {method: 'DELETE',  path: timeunitId, handler: timeunitsController.destroy}
  ]);

  return next();
};

exports.register.attributes = {
  name: 'user-routes',
  version: '0.0.1'
};
