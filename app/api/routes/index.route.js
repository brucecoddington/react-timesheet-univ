import Path from 'path';
import React from 'react/addons';
import Router from 'react-router';
import Location from 'react-router/lib/Location';
import routes from '../../routes';
import fetch from '../../util/fetch';

import Login from '../handlers/login';

exports.register = (server, options, next) => {

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

  function handler (request, reply) {
    return renderApp(request, (error, html, data) => {
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
    let location = new Location(request.url.path, request.query);

    Router.run(routes, location, (error, initialState, transition) => {
      Login.resolveCurrentUser(request, currentUser => {

        return fetch(initialState, currentUser, request)
          .then(stateData => {
            cb(null, React.renderToString(<Router  {...initialState}/>), stateData);
          });
        });
    });
  }
};

exports.register.attributes = {
  name: 'serve-index',
  version: '0.0.1'
};
