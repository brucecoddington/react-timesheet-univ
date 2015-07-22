let db = require('../services/db'),
  _ = require('lodash'),
  Boom = require('boom');

module.exports = {
  index: function (request, reply) {
    let userId = request.params.userId;
    let query = request.query;

    if (userId && userId !== 'all') {
      query = _.extend({user_id: userId}, query);
    }

    if (query.page) {
      db.page('timesheets', query)
        .then(reply)
        .fail(function (err) {
          reply(Boom.badImplementation(err));
        });
    }
    else {
      db.find('timesheets', query)
        .then(reply)
        .fail(function (err) {
          reply(Boom.badImplementation(err));
        });
    }
  },

  create: function (request, reply) {
    let userId = request.params.userId;

    let newTimesheet = request.payload;
    newTimesheet.user_id = userId;

    db.insert('timesheets', newTimesheet)
      .then(reply)
      .fail(function (err) {
        reply(Boom.badImplementation(err));
      });
  },

  show: function (request, reply) {
    let userId = request.params.userId;
    let id = request.params.timesheetId;

    db.findOne('timesheets', {user_id: userId, _id: id})
      .then(reply)
      .fail(function (err) {
        reply(Boom.badImplementation(err));
      });
  },

  update: function (request, reply) {
    let id = request.params.timesheetId;

    db.update('timesheets', {_id: id}, request.payload)
      .then(reply)
      .fail(function (err) {
        reply(Boom.badImplementation(err));
      });
  },

  destroy: function (request, reply) {
    let id = request.params.timesheetId;

    db.remove('timesheets', {_id: id})
      .then(() => {
        reply().code(204);
      })
      .fail(function (err) {
        reply(Boom.badImplementation(err));
      });
  }
};
