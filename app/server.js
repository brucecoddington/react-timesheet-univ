import Hapi from 'hapi';
import Good from 'good';
import Path from 'path';
import cookie from 'hapi-auth-cookie';
import props from './properties';
import jade from 'jade';

import FileRoutes from './api/routes/file.route';
import AuthRoutes from './api/routes/auth.route';
import ProjectsRoutes from './api/routes/projects.route';
import UsersRoutes from './api/routes/users.route';
import IndexRoutes from './api/routes/index.route';

console.log('Booting Development Server');

let server = new Hapi.Server();

server.connection({
  port: props.server.port,
  host: 'localhost'
});

// establish a session cache
let cache = server.cache({
  segment: 'sessions',
  expiresIn: props.session.expires
});
server.app.cache = cache;

// set up the view rendering
server.views({
  engines: {
    jade: jade
  },
  path: __dirname
});

// register the api routes
server.register([
  FileRoutes, AuthRoutes, ProjectsRoutes, UsersRoutes, IndexRoutes
], err => {
  if (err) console.log('Error registering routes: ' + err);
});

// Setup security session and cookie
// server.register(cookie, err => {
//
//   server.auth.strategy('session', 'cookie', true, {
//     password: props.security.cookieSecret,
//     isSecure: false,
//     validateFunc: function (request, session, callback) {
//
//       cache.get(session.sid, function (err, cached) {
//         if (err || !cached) {
//           return callback(err, false);
//         }
//         return callback(null, true, cached.user);
//       });
//     }
//   });
// });

// seed the database
require('./api/services/data').init();

// start em up
server.start();
