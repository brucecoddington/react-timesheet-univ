import db from '../services/db';
import _ from 'lodash';
import Boom from 'boom';

export default {
  index (request, reply) {
    let userId = request.params.userId;
    let query = request.query;

    if (userId && userId !== 'all') {
      query = _.extend({user_id: userId}, query);
    }

    if (query.page) {
      db.page('timesheets', query)
        .then(reply)
        .fail((err) => {
          reply(Boom.badImplementation(err));
        });
    }
    else {
      db.find('timesheets', query)
        .then(reply)
        .fail((err) => {
          reply(Boom.badImplementation(err));
        });
    }
  },

  create (request, reply) {
    let userId = request.params.userId;

    let newTimesheet = request.payload;
    newTimesheet.user_id = userId;

    db.insert('timesheets', newTimesheet)
      .then(reply)
      .fail((err) => {
        reply(Boom.badImplementation(err));
      });
  },

  show (request, reply) {
    let userId = request.params.userId;
    let id = request.params.timesheetId;

    db.findOne('timesheets', {user_id: userId, _id: id})
      .then(reply)
      .fail((err) => {
        reply(Boom.badImplementation(err));
      });
  },

  update (request, reply) {
    let id = request.params.timesheetId;

    db.update('timesheets', {_id: id}, request.payload)
      .then(reply)
      .fail((err) => {
        reply(Boom.badImplementation(err));
      });
  },

  destroy (request, reply) {
    let id = request.params.timesheetId;

    db.remove('timesheets', {_id: id})
      .then(() => {
        reply().code(204);
      })
      .fail((err) => {
        reply(Boom.badImplementation(err));
      });
  }
};
