import moment from 'moment';
import React, {PropTypes} from 'react/addons';
import classNames from 'classnames';

const Day = React.createClass({

  propTypes: {
    selected: PropTypes.object,
    onClick: PropTypes.func.isRequired,
    day: PropTypes.object
  },

  render () {
    let classes = classNames('datepicker-calendar-day', {
      'selected': this.props.day.sameDay(this.props.selected),
      'this-month': this.props.day.sameMonth(this.props.date),
      'today': this.props.day.sameDay(moment())
    });

    return (
      <div className={classes} onClick={this.props.onClick}>
        {this.props.day.day()}
      </div>
    );
  }
});

export default Day;
