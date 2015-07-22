import React, {PropTypes} from 'react/addons';
import Router, {Navigation, State} from 'react-router';

import TextInput from '../common/form/text.input';
import SaveButton from '../common/buttons/save.button';
import CancelButton from '../common/buttons/cancel.button';

const ProjectForm = React.createClass({

  propTypes: {
    project: PropTypes.object,
    validate: PropTypes.func.isRequired,
    hasErrors: PropTypes.func.isRequired,
    saveText: PropTypes.string.isRequired,
    errors: PropTypes.object
  },

  mixins: [
    Navigation,
    State
  ],

  onCancel (event) {
    event.preventDefault();
    this.transitionTo('projects');
  },

  render  () {
    return (
      <div className="ui ten column centered grid">
        <div className="ten wide column">
          <form className="ui inline form" name="projectForm" onSubmit={this.props.onSave}>

            <TextInput name="name"
              label="Name"
              placeholder="Project Name"
              value={this.props.project.name}
              error={this.props.errors.name}
              onChange={this.props.validate} />

            <TextInput name="description"
              label="Description"
              placeholder="Project Description"
              value={this.props.project.description}
              error={this.props.errors.description}
              onChange={this.props.validate} />

            <div className="ui horizontal divider"></div>

            <div className="ui sixteen column right floated grid">
              <SaveButton validateAll={this.props.validateAll} hasErrors={this.props.hasErrors()} saveText={this.props.saveText} />
              <CancelButton onCancel={this.onCancel} />
            </div>
          </form>
        </div>
      </div>
    );
  }
});

export default ProjectForm;
