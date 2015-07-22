import React, {PropTypes} from 'react/addons';

const Input = React.createClass({

  propTypes: {
    name:         PropTypes.string.isRequired,
    label:        PropTypes.string.isRequired,
    value:        PropTypes.bool,
    onChange:     PropTypes.func.isRequired,
    onClick:      PropTypes.func.isRequired
  },

  render () {
    return (
      <div className="inline field" onClick={this.props.onClick}>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <div className="ui toggle checkbox">
          <input type="checkbox"
            name={this.props.name}
            checked={this.props.value}
            onChange={this.props.onChange} />

          <label>{this.props.value ? 'Yes' : 'No'}</label>
        </div>
      </div>
    );
  }
});

export default Input;
