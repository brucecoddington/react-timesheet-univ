import projectsController from '../handlers/projects';

exports.register = (server, options, next) => {

  const projects =  '/api/projects';
  const projectId = '/api/projects/{projectId}';

  server.route([
    {method: 'GET',     path: projects, handler: projectsController.index},
    {method: 'POST',    path: projects, handler: projectsController.create},
    {method: 'GET',     path: projectId, handler: projectsController.show},
    {method: 'PUT',     path: projectId, handler: projectsController.update},
    {method: 'DELETE',  path: projectId, handler: projectsController.destroy}
  ]);

  return next();
};

exports.register.attributes = {
  name: 'projects-routes',
  version: '0.0.1'
};
