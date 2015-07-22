import dispatcher from '../flux/flux.dispatcher';

const ProjectActions = {

  LIST: 'LIST_PROJECTS',
  GET: 'GET_PROJECT',
  CREATE: 'CREATE_PROJECT',
  UPDATE: 'UPDATE_PROJECT',
  DELETE: 'DELETE_PROJECT',
  RESTORE: 'RESTORE_PROJECT',

  list (query) {
    dispatcher.handleViewAction({
      actionType: ProjectActions.LIST,
      query: query
    });
  },

  get (id) {
    dispatcher.handleViewAction({
      actionType: ProjectActions.GET,
      project: {_id: id}
    });
  },

  create (project) {
    dispatcher.handleViewAction({
      actionType: ProjectActions.CREATE,
      project: project
    });
  },

  update (project) {
    dispatcher.handleViewAction({
      actionType: ProjectActions.UPDATE,
      project: project
    });
  },

  remove (project) {
    dispatcher.handleViewAction({
      actionType: ProjectActions.DELETE,
      project: project
    });
  },

  restore (project) {
    dispatcher.handleViewAction({
      actionType: ProjectActions.RESTORE,
      project: project
    });
  }
};

export default ProjectActions;
