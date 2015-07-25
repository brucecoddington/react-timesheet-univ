let Hapi = require('hapi');
let Good = require('good');
let Path = require('path');
let cookie = require('hapi-auth-cookie');
let props = require('./properties');

console.log('Booting Development Server');

let server = new Hapi.Server();

server.connection({
  port: props.server.port,
  host: 'localhost'
});

// establish a session cache
var cache = server.cache({
  segment: 'sessions',
  expiresIn: props.session.expires
});
server.app.cache = cache;

// set up the view rendering
server.views({
  engines: {
    jade: require('jade')
  },
  path: __dirname
});

// register the api routes
server.register([
  require('./api/routes/file.route'),
  require('./api/routes/auth.route'),
  require('./api/routes/projects.route'),
  require('./api/routes/users.route'),
  require('./api/routes/index.route')

], (err) => {
  if (err) console.log('Error registering routes: ' + err);
});

// Setup security session and cookie
// server.register(cookie, (err) => {
//
//   server.auth.strategy('session', 'cookie', true, {
//     password: props.security.cookieSecret,
//     isSecure: false,
//     validateFunc: function (session, callback) {
//
//       cache.get(session.sid, function (err, cached) {
//
//         if (err || !cached) {
//           return callback(err, false);
//         }
//
//         return callback(null, true, cached.user);
//       });
//     }
//   });
// });

// seed the database
require('./api/services/data').init();

// start em up
server.start();
