import Q from 'q';
import Boom from 'boom';
import Bcrypt from 'bcrypt';
import db from '../services/db';
import props from '../../properties';

export default {
  index: sendCurrentUser,
  login: login,
  resolveCurrentUser: resolveCurrentUser
};

function sendCurrentUser (request, reply) {
  request.server.app.cache.get(props.session.secret, (err, auth) => {
    let currentUser = auth ? auth.user : null;
    reply(sanitize(currentUser));
  });
}

function resolveCurrentUser (request, cb) {
  request.server.app.cache.get(props.session.secret, (err, auth) => {
    // if not authenticated, use the default user
    let currentUser = auth ? auth.user : {_id: 'all'};
    return cb(sanitize(currentUser));
  });
}

function login (request, reply) {

  let authenticatedUser;

  if (!request.payload.username || !request.payload.password) {
    return reply(Boom.unauthorized('Missing username or password')).code(401);
  }

  db.findOne('users', {username: request.payload.username})
    .then(user => {
      authenticatedUser = user;
      return validate(request.payload.password, user.password);
    })
    .then(isValid => {

      if (!isValid) {
        Q.reject(Boom.unauthorized('Invalid username or password'));
      }

      return setSession(request, props.session.secret, {user: authenticatedUser});
    })
    .then(() => {
      request.auth.session.set({ sid: props.session.secret });
      return reply(sanitize(authenticatedUser));
    })
    .fail(err => {
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
