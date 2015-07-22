import db from '../services/db';
import _ from 'lodash';
import Boom from 'boom';

export default {
  index (request, reply) {
    let timesheetId = request.params.timesheetId;
    let query = _.extend({timesheet_id: timesheetId}, request.query);

    db.find('timeunits', query)
      .then(reply);
  },

  create (request, reply) {

    db.insert('timeunits', request.payload)
      .then(reply)
      .fail(function (err) {
        reply(Boom.badImplementation(err));
      });
  },

  show (request, reply) {
    let id = request.params.timeunitId;

    db.findOne('timeunits', {_id: id})
      .then(reply)
      .fail(function (err) {
        reply(Boom.badImplementation(err));
      });
  },

  update (request, reply) {
    let id = request.params.timeunitId;

    db.update('timeunits', {_id: id}, request.payload)
      .then(reply)
      .fail(function (err) {
        reply(Boom.badImplementation(err));
      });
  },

  destroy (request, reply) {
    let id = request.params.timeunitId;

    db.remove('timeunits', {_id: id})
      .then(() => {
        reply().code(204);
      })
      .fail(function (err) {
        reply(Boom.badImplementation(err));
      });
  }
};
