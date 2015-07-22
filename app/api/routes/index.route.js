'use strict';


// 'use strict';
//
// var Path = require('path');
//
// exports.register = function (server, options, next) {
//
//   server.path(Path.join(__dirname, '../../client/'));
//
//   server.route({
//     method: 'GET',
//     path: '/',
//     config: {
//       handler: {
//         file: 'dist/index.html'
//       },
//       auth: false
//     }
//   });
//
//   return next();
// };
//
// exports.register.attributes = {
//   name: 'serve-index',
//   version: '0.0.1'
// };






let Path = require('path');
let Router = require('react-router');
let React = require('react/addons');
let AppRoutes = require('../../routes');



exports.register = function (server, options, next) {

  server.path(Path.join(__dirname, '../../..'));

  server.route({
    method: 'GET',
    path: '/login',
    config: {
      handler: handler,
      auth: false
    }
  });

  server.route({
    method: 'GET',
    path: '/page/{route*}',
    config: {
      handler: handler,
      auth: false
    }
  });

  server.route({
    method: 'GET',
    path: '/',
    config: {
      handler: function (request, reply) {
        reply.redirect('/page');
      },
      auth: false
    }
  });

  return next();

  function handler(request, reply) {
    return renderApp(request, function (error, html, data) {
      if (!error) {
        reply.view('./index', {html: html, data: data});
      }
      else if (error.redirect) {
        reply.redirect(error.redirect.to);
      }
      // else if (error.notFound) {
      //   res.writeHead(404, { 'Content-Type': 'text/html' });
      //   res.write(html);
      //   res.end();
      // }
    });
  }

  function renderApp (request, cb) {

    let router = Router.create({
      routes: AppRoutes,
      location: request.url.path,
      onAbort: function (redirect) {
        cb({redirect: redirect});
      },
      onError: function (err) {
        console.log('Routing Error');
        console.log(err);
      }
    });

    router.run(function (Handler, state) {
      cb(null, React.renderToString(<Handler />));
    });
  };
};

exports.register.attributes = {
  name: 'serve-index',
  version: '0.0.1'
};
