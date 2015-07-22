import React, {PropTypes} from 'react/addons';
import classNames from 'classnames';
// let ReactSelect from 'react-select');

const Select = React.createClass({

  propTypes: {
    name:         PropTypes.string.isRequired,
    label:        PropTypes.string.isRequired,
    onChange:     PropTypes.func.isRequired,
    placeholder:  PropTypes.string,
    value:        PropTypes.string,
    error:        PropTypes.string,
    options:      PropTypes.arrayOf(PropTypes.object)
  },

  render () {
    let wrapperClasses = classNames('inline field', {
      'error': !!this.props.error
    });

    let containerClasses = classNames('field', {
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
