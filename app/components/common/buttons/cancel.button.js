import React, {PropTypes} from 'react/addons';

const CancelButton = React.createClass({

  propTypes: {
    onCancel: PropTypes.func.isRequired
  },

  render () {
    return (
      <div className="eight wide column">
        <button className="ui secondary button red" type="button"
          onClick={this.props.onCancel}>Cancel</button>
      </div>
    );
  }
});

export default CancelButton;
