import React, {PropTypes} from 'react/addons';
var classes = require('react-classes');

var Input = React.createClass({

  propTypes: {
    name:         PropTypes.string.isRequired,
    label:        PropTypes.string.isRequired,
    value:        PropTypes.number,
    placeholder:  PropTypes.string,
    error:        PropTypes.string,
    onChange:     PropTypes.func.isRequired
  },

  mixins: [classes],

  render () {
    var wrapperClasses = this.getClass('inline field', {
      'error': this.props.error
    });

    var errorMessageClasses = this.getClass('input', {
      'error': this.props.error
    });

    return (
      <div className={wrapperClasses}>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <div>
          <input type="number"
            className="form-control"
            name={this.props.name}
            placeholder={this.props.placeholder}
            ref={this.props.name}
            value={this.props.value}
            onChange={this.props.onChange} />

          <div className={errorMessageClasses}>{this.props.error}</div>
        </div>
      </div>
    );
  }
});

export default Input;
