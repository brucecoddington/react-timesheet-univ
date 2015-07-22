let Q = require('q');
let Boom = require('boom');
let Bcrypt = require('bcrypt');
let db = require('../services/db');
let props = require('../../properties');

module.exports = {
  index: sendCurrentUser,
  login: login
};

function sendCurrentUser (request, reply) {
  request.server.app.cache.get(props.session.secret, function (err, auth) {
    let currentUser = auth ? auth.user : null;
    reply(sanitize(currentUser));
  });
}

function login (request, reply) {

  let authenticatedUser;

  if (!request.payload.username || !request.payload.password) {
    return reply(Boom.unauthorized('Missing username or password')).code(401);
  }

  db.findOne('users', {username: request.payload.username})
    .then(function (user) {
      authenticatedUser = user;
      return validate(request.payload.password, user.password);
    })
    .then(function (isValid) {

      if (!isValid) {
        Q.reject(Boom.unauthorized('Invalid username or password'));
      }

      return setSession(request, props.session.secret, {user: authenticatedUser});
    })
    .then(() => {
      request.auth.session.set({ sid: props.session.secret });
      return reply(sanitize(authenticatedUser));
    })
    .fail(function (err) {
      reply(Boom.unauthorized(err.message)).code(401);
    });
}

function validate (password, userPassword) {
  return Q.ninvoke(Bcrypt, 'compare', password, userPassword);
}

function setSession (request, sid, cacheObject) {
  return Q.ninvoke(request.server.app.cache, 'set', sid, cacheObject, 0);
}

function sanitize (user) {
  if ( user ) {
    return {
      authenticated: true,
      user : {
        _id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        admin: user.admin
      }
    };
  } else {
    return { user: null };
  }
}
