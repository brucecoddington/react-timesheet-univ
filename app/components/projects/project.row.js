import React, {PropTypes} from 'react/addons';
import Router, {Navigation} from 'react-router';
import classNames from 'classnames';
import ProjectActions from '../../actions/project.actions';
import SnackbarAction from '../../actions/snackbar.actions';

const ProjectRow = React.createClass({

  propTypes: {
    project: PropTypes.object,
    store: PropTypes.object.isRequired
  },

  mixins: [
    Navigation
  ],

  showDetail () {
    if (this.props.project.deleted) {
      SnackbarAction.error('You cannot edit a deleted project.');
      return;
    }
    this.props.store.setState({project: this.props.project});
    this.transitionTo(`/projects/detail/${this.props.project._id}`);
  },

  remove (e) {
    e.stopPropagation();
    this.props.project.deleted = true;
    ProjectActions.remove(this.props.project);
  },

  restore (e) {
    e.stopPropagation();
    this.props.project.deleted = false;
    ProjectActions.restore(this.props.project);
  },

  render () {
    let project = this.props.project;

    let rowClasses = classNames('repeated-item fadeable-row', {
      'faded': project.deleted
    });

    let buttonClasses = classNames('ui primary button small', {
      'positive': project.deleted,
      'negative': !project.deleted
    });

    return (
      <tr className={rowClasses} onClick={this.showDetail}>

        <td>{project.name}</td>
        <td>{project.description}</td>
        <td>
          <button className={buttonClasses} onClick={project.deleted ? this.restore : this.remove}>
            {project.deleted ? 'Restore' : 'Delete'}
          </button>
        </td>
      </tr>
    );
  }
});

export default ProjectRow;
