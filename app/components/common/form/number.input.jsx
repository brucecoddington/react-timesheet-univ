var React = require('react/addons');
var classes = require('react-classes');

var Input = React.createClass({

  propTypes: {
    name:         React.PropTypes.string.isRequired,
    label:        React.PropTypes.string.isRequired,
    value:        React.PropTypes.number,
    placeholder:  React.PropTypes.string,
    error:        React.PropTypes.string,
    onChange:     React.PropTypes.func.isRequired
  },

  mixins: [classes],

  render: function () {
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

module.exports = Input;
