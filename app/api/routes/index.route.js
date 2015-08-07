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
        // Respond with index.jade and provide the html and data variables
        reply.view('./index', {html: html, data: data, process: process});
      }
      else if (error.redirect) {
        reply.redirect(error.redirect.to);
      }
    });
  }

  function renderApp (request, cb) {
    // Create a react-router Location from the http request
    let location = new Location(request.url.path, request.query);

    // Run the router to determine the active components
    Router.run(routes, location, (error, initialState, transition) => {
      Login.resolveCurrentUser(request, currentUser => {

        // Fetch the data needed to instantiate the components
        return fetch(initialState, currentUser, request)
          .then(stateData => {

            // Render the resulting HTML to a string to be sent to Jade template
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
