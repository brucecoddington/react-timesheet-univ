import db from '../services/db');
import Boom from 'boom';

export default {
  index (request, reply) {

    let query = request.query;

    if (query.page) {

      db.page('projects', query)
        .then(reply)
        .fail((err) => {
          reply(Boom.badImplementation(err));
        });
    } else {

      db.find('projects', query)
        .then((projects) => {
          reply(projects);
        })
        .fail((err) => {
          reply(Boom.badImplementation(err));
        });
    }
  },

  create (request, reply) {

    db.insert('projects', request.payload)
      .then((project) => {
        reply(project);
      })
      .fail((err) => {
        reply(Boom.badImplementation(err));
      });
  },

  show (request, reply) {
    let id = request.params.projectId;

    db.findOne('projects', {_id: id})
      .then((project) => {
        reply(project);
      })
      .fail((err) => {
        reply(Boom.badImplementation(err));
      });
  },

  update (request, reply) {
    let id = request.params.projectId;

    db.update('projects', {_id: id}, request.payload)
      .then((project) => {
        reply(project);
      })
      .fail((err) => {
        reply(Boom.badImplementation(err));
      });
  },

  destroy (request, reply) {
    let id = request.params.projectId;

    db.remove('projects', {_id: id})
      .then(() => {
        reply().code(200);
      })
      .fail((err) => {
        reply(Boom.badImplementation(err));
      });
  }
};
