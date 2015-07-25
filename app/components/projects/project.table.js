import React, {PropTypes} from 'react/addons';
import ProjectRow from './project.row';

const ProjectTable = React.createClass({

  propTypes: {
    projects: PropTypes.arrayOf(PropTypes.object).isRequired,
    store: PropTypes.object.isRequired
  },

  render () {
    let store = this.props.store;

    let projectRows = this.props.projects.map(project => {
      return (
        <ProjectRow project={project} key={project._id} store={store} />
      );
    });

    return (
      <table className="ui celled table tsz-table-row-cursor">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th className="tsz-table-delete-column">Delete</th>
          </tr>
        </thead>
        <tbody>
          {projectRows}
        </tbody>
      </table>
    );
  }
});

export default ProjectTable;
