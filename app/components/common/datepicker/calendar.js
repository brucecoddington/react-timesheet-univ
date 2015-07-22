import Day from './day';
import DateUtil from './date.util';
import React, {PropTypes} from 'react/addons';

const Calendar = React.createClass({

  propTypes: {
    selected:     PropTypes.object,
    onSelect:     PropTypes.func.isRequired,
    onMouseDown:  PropTypes.func
  },

  getInitialState () {
    return {
      date: new DateUtil(this.props.selected).clone()
    };
  },

  componentWillReceiveProps (nextProps) {
    // When the selected date changed
    if (nextProps.selected !== this.props.selected) {
      this.setState({
        date: new DateUtil(nextProps.selected).clone()
      });
    }
  },

  increaseMonth () {
    this.setState({
      date: this.state.date.addMonth()
    });
  },

  decreaseMonth () {
    this.setState({
      date: this.state.date.subtractMonth()
    });
  },

  weeks () {
    return this.state.date.mapWeeksInMonth(this.renderWeek);
  },

  handleDayClick (day) {
    this.props.onSelect(day);
  },

  renderWeek (weekStart, key) {
    if(! weekStart.weekInMonth(this.state.date)) {
      return;
    }

    return (
      <div key={key} className="week">
        {this.days(weekStart)}
      </div>
    );
  },

  renderDay (day, key) {
    return (
      <Day
        key={key}
        day={day}
        date={this.state.date}
        onClick={this.handleDayClick.bind(this, day)}
        selected={new DateUtil(this.props.selected)} />
    );
  },

  days (weekStart) {
    return weekStart.mapDaysInWeek(this.renderDay);
  },

  render () {
    return (
      <div className="datepicker-calendar" onMouseDown={this.props.onMouseDown}>
        <div className="datepicker-calendar-triangle"></div>
        <div className="datepicker-calendar-header">
          <a className="datepicker-calendar-header-navigation-left"
              onClick={this.decreaseMonth}>
          </a>
          <span className="datepicker-calendar-header-month">
            {this.state.date.format("MMMM YYYY")}
          </span>
          <a className="datepicker-calendar-header-navigation-right"
              onClick={this.increaseMonth}>
          </a>
          <div>
            <div className="datepicker-calendar-header-day">Mo</div>
            <div className="datepicker-calendar-header-day">Tu</div>
            <div className="datepicker-calendar-header-day">We</div>
            <div className="datepicker-calendar-header-day">Th</div>
            <div className="datepicker-calendar-header-day">Fr</div>
            <div className="datepicker-calendar-header-day">Sa</div>
            <div className="datepicker-calendar-header-day">Su</div>
          </div>
        </div>
        <div className="datepicker-calendar-month">
          {this.weeks()}
        </div>
      </div>
    );
  }
});

export default Calendar;
