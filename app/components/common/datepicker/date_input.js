import moment from 'moment';
import DateUtil from './date.util';
import React, {PropTypes} from 'react/addons';
import classNames from 'classnames';

const DateInput = React.createClass({

  propTypes: {
    name:               PropTypes.string.isRequired,
    date:               PropTypes.object,
    focus:              PropTypes.bool,
    handleClick:        PropTypes.func,
    handleEnter:        PropTypes.func,
    handleButtonClick:  PropTypes.func,
    onBlur:             PropTypes.func,
    onFocus:            PropTypes.func,
    error:              PropTypes.string
  },

  getInitialState () {
    return {
      value: this.props.date.format("YYYY-MM-DD")
    };
  },

  componentDidMount () {
    this.toggleFocus(this.props.focus);
  },

  componentWillReceiveProps (newProps) {
    this.toggleFocus(newProps.focus);

    this.setState({
      value: newProps.date.format("YYYY-MM-DD")
    });
  },

  componentDidUpdate () {
    if (this.props.focus) {
      let el = this.refs[this.props.name].getDOMNode();

      if (typeof this.state.selectionStart == "number")
        el.selectionStart = this.state.selectionStart;

      if (typeof this.state.selectionEnd == "number")
        el.selectionEnd = this.state.selectionEnd;
    }
  },

  toggleFocus (focus) {
    if (focus) {
      this.refs[this.props.name].getDOMNode().focus();
    } else {
      this.refs[this.props.name].getDOMNode().blur();
    }
  },

  handleChange (event) {
    let date = moment(event.target.value, "YYYY-MM-DD", true);

    this.setState({
      value: event.target.value
    });

    if (this.isValueAValidDate()) {
      this.props.setSelected(new DateUtil(date));
    }
  },

  isValueAValidDate () {
    let date = moment(event.target.value, "YYYY-MM-DD", true);

    return date.isValid();
  },

  handleKeyDown (event) {
    switch(event.key) {
    case "Enter":
      event.preventDefault();
      this.props.handleEnter();
      break;
    case "ArrowUp":
    case "ArrowDown":
      event.preventDefault();
      this.handleArrowUpDown(event.key);
      break;
    }
  },

  handleArrowUpDown (key) {
    if (! this.isValueAValidDate())
      return;

    this.updateSelectionState();

    let el = this.refs[this.props.name].getDOMNode();
    let step = key === "ArrowUp" ? 1 : -1;

    let selectedDatePart = this.getSelectedDatePart(el.selectionStart, el.selectionEnd);
    let newDate = this.stepSelectedDatePart(selectedDatePart, step);

    this.props.setSelected(newDate);
  },

  stepSelectedDatePart (selectedDatePart, step) {
    let clonedDate = this.props.date.clone();

    return new DateUtil(clonedDate.add(selectedDatePart, step));
  },

  getSelectedDatePart (selectionStart, selectionEnd) {
    if (selectionStart >= 0 && selectionEnd <= 4) {
      return "year";
    } else if (selectionStart >= 5 && selectionEnd <= 7) {
      return "month";
    } else if (selectionStart >= 8 && selectionEnd <= 10) {
      return "day";
    }
  },

  updateSelectionState () {
    let el = this.refs[this.props.name].getDOMNode();

    this.setState({
      selectionStart: el.selectionStart,
      selectionEnd: el.selectionEnd
    });
  },

  handleClick (event) {
    this.updateSelectionState();
    this.props.handleClick();
  },

  handleButtonClick (event) {
    event.preventDefault();
    event.stopPropagation();

    this.updateSelectionState();
    this.props.handleButtonClick();
  },

  render () {
    let containerClasses = classNames('ui inline field', {
      'error': !!this.props.error
    });

    let errorMessageClasses = classNames('input', {
      'error': !!this.props.error
    });

    return (
      <div className="datepicker-input">
        <div className={containerClasses}>
          <input
            ref={this.props.name}
            name={this.props.name}
            type="text"
            value={this.state.value}
            onBlur={this.props.onBlur}
            onClick={this.handleClick}
            onKeyDown={this.handleKeyDown}
            onFocus={this.props.onFocus}
            onChange={this.handleChange} />
          <span>
            <button className="ui secondary button" onClick={this.handleButtonClick}>
              <i className="fa fa-fw fa-calendar"></i>
            </button>
          </span>
        </div>
        <div className={errorMessageClasses}>{this.props.error}</div>
      </div>
    );
  }
});

export default DateInput;
