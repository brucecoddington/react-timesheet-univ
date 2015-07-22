import React, {PropTypes} from 'react/addons';
var classes = require('react-classes');
// var ReactSelect = require('react-select');

var Select = React.createClass({

  propTypes: {
    name:         PropTypes.string.isRequired,
    label:        PropTypes.string.isRequired,
    onChange:     PropTypes.func.isRequired,
    placeholder:  PropTypes.string,
    value:        PropTypes.string,
    error:        PropTypes.string,
    options:      PropTypes.arrayOf(PropTypes.object)
  },

  mixins: [classes],

  render () {
    var wrapperClasses = this.getClass('inline field', {
      'error': !!this.props.error
    });

    var containerClasses = this.getClass('field', {
      'error': !!this.props.error
    });

    return (
      <div className={wrapperClasses}>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <div className={containerClasses}>


          <div className="input">{this.props.error}</div>
        </div>
      </div>
    );
  }
});

export default Select;
