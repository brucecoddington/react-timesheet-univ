let db = require('../services/db');

module.exports = {
  index: function (request, reply) {
    let query = request.query;

    if (query.page) {

      db.page('users', query)
        .then(function (users) {
          reply(users);
        })
        .fail(function (err) {
          reply(err).code(500);
        });
    } else {

      db.find('users', query)
        .then(function (users) {
          reply(users);
        })
        .fail(function (err) {
          reply(err).code(500);
        });
    }
  },

  create: function (request, reply) {

    db.insert('users', request.payload)
      .then(function (user) {
        reply(user);
      })
      .fail(function (err) {
        reply(err).code(500);
      });
  },

  show: function (request, reply) {
    let id = request.params.userId;

    db.findOne('users', {_id: id})
      .then(function (user) {
        reply(user);
      })
      .fail(function (err) {
        reply(err).code(500);
      });
  },

  update: function (request, reply) {
    let id = request.params.userId;

    db.update('users', {_id: id}, request.payload)
      .then(function (user) {
        reply(user);
      })
      .fail(function (err) {
        reply(err).code(500);
      });
  },

  destroy: function (request, reply) {
    let id = request.params.userId;

    db.remove('users', {_id: id})
      .then(() => {
        res.send(200);
      })
      .fail(function (err) {
        reply(err).code(500);
      });
  }
};
