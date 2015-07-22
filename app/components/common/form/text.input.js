import React, {PropTypes} from 'react/addons';
var classes = require('react-classes');

var Input = React.createClass({

  propTypes: {
    name:         PropTypes.string.isRequired,
    label:        PropTypes.string.isRequired,
    onChange:     PropTypes.func.isRequired,
    placeholder:  PropTypes.string,
    value:        PropTypes.string,
    error:        PropTypes.string
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
          <input type="text"
            name={this.props.name}
            placeholder={this.props.placeholder}
            ref={this.props.name}
            value={this.props.value}
            onChange={this.props.onChange} />
          <div className="input">{this.props.error}</div>
        </div>
      </div>
    );
  }
});

export default Input;
