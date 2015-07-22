import React, {PropTypes} from 'react/addons';

const SaveButton = React.createClass({

  propTypes: {
    hasErrors:   PropTypes.bool,
    saveText:    PropTypes.string.isRequired
  },

  render () {

    return (
      <div className="eight wide column">
        <button className="ui primary button" disabled={this.props.hasErrors} type="submit">
          {this.props.saveText}
        </button>
      </div>
    );
  }
});

export default SaveButton;
