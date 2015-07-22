import React, {PropTypes} from 'react/addons';
import classNames from 'classnames';

const Input = React.createClass({

  propTypes: {
    name:         PropTypes.string.isRequired,
    label:        PropTypes.string.isRequired,
    value:        PropTypes.number,
    placeholder:  PropTypes.string,
    error:        PropTypes.string,
    onChange:     PropTypes.func.isRequired
  },

  render () {
    let wrapperClasses = classNames('inline field', {
      'error': this.props.error
    });

    let errorMessageClasses = classNames('input', {
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
