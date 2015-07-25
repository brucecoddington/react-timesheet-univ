import db from '../services/db';

export default {
  index (request, reply) {
    let query = request.query;

    if (query.page) {

      db.page('users', query)
        .then(reply)
        .fail(err => {
          reply(err).code(500);
        });
    } else {

      db.find('users', query)
        .then(reply)
        .fail(err => {
          reply(err).code(500);
        });
    }
  },

  create (request, reply) {

    db.insert('users', request.payload)
      .then(reply)
      .fail(err => {
        reply(err).code(500);
      });
  },

  show (request, reply) {
    let id = request.params.userId;

    db.findOne('users', {_id: id})
      .then(reply)
      .fail(err => {
        reply(err).code(500);
      });
  },

  update (request, reply) {
    let id = request.params.userId;

    db.update('users', {_id: id}, request.payload)
      .then(reply)
      .fail(err => {
        reply(err).code(500);
      });
  },

  destroy (request, reply) {
    let id = request.params.userId;

    db.remove('users', {_id: id})
      .then(() => {
        res.send(200);
      })
      .fail(err => {
        reply(err).code(500);
      });
  }
};
