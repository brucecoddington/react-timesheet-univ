import Popover   from './popover';
import DateUtil  from './date.util';
import Calendar  from './calendar';
import DateInput from './date_input';
import React, {PropTypes} from 'react/addons';
import classnames from 'classnames';

const DatePicker = React.createClass({

  propTypes: {
    name:       PropTypes.string.isRequired,
    label:      PropTypes.string.isRequired,
    selected:   PropTypes.object,
    error:      PropTypes.string,
    onChange:   PropTypes.func.isRequired
  },

  getInitialState () {
    return {
      focus: false
    };
  },

  handleFocus () {
    this.setState({
      focus: true
    });
  },

  hideCalendar () {
    this.setState({
      focus: false
    });
  },

  handleBlur (event) {
    // if we click the button, let it do its job
    if (event.relatedTarget === event.target.nextSibling.children[0]) return;

    this.setState({
      focus: !! this._shouldBeFocussed
    });

    if (!! this._shouldBeFocussed) {
      // Firefox doesn't support immediately focussing inside of blur
      setTimeout(function() {
        this.setState({
          focus: true
        });
      }.bind(this), 0);
    }

    // Reset the value of this._shouldBeFocussed to it's default
    this._shouldBeFocussed = false;
  },

  handleCalendarMouseDown () {
    this._shouldBeFocussed = true;
  },

  handleSelect (date) {
    this.setSelected(date);

    setTimeout(function(){
      this.hideCalendar();
    }.bind(this), 200);
  },

  setSelected (date) {
    this.props.onChange(date.moment());
  },

  onInputClick () {
    this.setState({
      focus: true
    });
  },

  onButtonClick () {
    this.setState({
      focus: !this.state.focus
    });

    // focus the input on button click so that blur will close the popover
    this.refs[this.props.name].refs[this.props.name].getDOMNode().focus();
  },

  calendar () {
    if (this.state.focus) {
      return (
        <Popover>
          <Calendar
            selected={this.props.selected}
            onSelect={this.handleSelect}
            onMouseDown={this.handleCalendarMouseDown} />
        </Popover>
      );
    }
  },

  render () {
    var wrapperClasses = this.getClass('inline field', {
      'error': !!this.props.error
    });

    return (
       <div className={wrapperClasses}>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <DateInput
          ref={this.props.name}
          name={this.props.name}
          date={this.props.selected}
          focus={this.state.focus}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          handleClick={this.onInputClick}
          handleButtonClick={this.onButtonClick}
          handleEnter={this.hideCalendar}
          setSelected={this.setSelected}
          error={this.props.error} />
        {this.calendar()}
      </div>
    );
  }
});

export default DatePicker;
