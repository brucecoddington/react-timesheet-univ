var React = require('react/addons');
var Router = require('react-router');
var classes = require('react-classes');

var ProjectActions = require('../../actions/project.actions');

var SnackbarAction = require('../../actions/snackbar.actions');

var ProjectRow = React.createClass({

  propTypes: {
    project: React.PropTypes.object,
    store: React.PropTypes.object.isRequired
  },

  mixins: [
    Router.Navigation,
    classes
  ],

  showDetail: function showDetail () {
    if (this.props.project.deleted) {
      SnackbarAction.error('You cannot edit a deleted project.');
      return;
    }
    this.props.store.setState({project: this.props.project});
    this.transitionTo('projects.detail', {_id: this.props.project._id});
  },

  remove: function remove (e) {
    e.stopPropagation();
    this.props.project.deleted = true;
    ProjectActions.remove(this.props.project);
  },

  restore: function restore (e) {
    e.stopPropagation();
    this.props.project.deleted = false;
    ProjectActions.restore(this.props.project);
  },

  render: function () {
    var project = this.props.project;

    var rowClasses = this.getClass('repeated-item fadeable-row', {
      'faded': project.deleted
    });

    var buttonClasses = this.getClass('ui primary button small', {
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

module.exports = ProjectRow;
