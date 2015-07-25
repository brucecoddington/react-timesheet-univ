import Path from 'path';
import Router from 'react-router';
import React from 'react/addons';
import AppRoutes from '../../routes';
import fetch from '../../util/fetch';

import ProjectStore from '../../stores/project.store';

exports.register = function (server, options, next) {

  server.path(Path.join(__dirname, '../../..'));

  server.route({
    method: 'GET',
    path: '/{route*}',
    config: {
      handler: handler,
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
      return fetch(state)
        .then((stateData) => {
          cb(null, React.renderToString(<Handler />), stateData);
        });
    });
  }
};

exports.register.attributes = {
  name: 'serve-index',
  version: '0.0.1'
};
