class DateUtil {

  constructor (date) {
    this._date = date;
  },

  sameDay (other) {
    return this._date.isSame(other._date, 'day');
  },

  sameMonth (other) {
    return this._date.isSame(other._date, 'month');
  },

  day () {
    return this._date.date();
  },

  mapDaysInWeek (callback) {
    var week = [];
    var firstDay = this._date.clone().startOf('isoWeek');

    for(var i = 0; i < 7; i++) {
      var day = new DateUtil(firstDay.clone().add(i, 'days'));

      week[i] = callback(day, i);
    }

    return week;
  },

  mapWeeksInMonth (callback) {
    var month = [];
    var firstDay = this._date.clone().startOf('month').startOf('isoWeek');

    for(var i = 0; i < 6; i++) {
      var weekStart = new DateUtil(firstDay.clone().add(i, 'weeks'));

      month[i] = callback(weekStart, i);
    }

    return month;
  },

  weekInMonth (other) {
    var firstDayInWeek = this._date.clone();
    var lastDayInWeek = this._date.clone().isoWeekday(7);

    return firstDayInWeek.isSame(other._date, 'month') ||
      lastDayInWeek.isSame(other._date, 'month');
  },

  format () {
    return this._date.format.apply(this._date, arguments);
  },

  addMonth () {
    return new DateUtil(this._date.clone().add(1, 'month'));
  },

  subtractMonth () {
    return new DateUtil(this._date.clone().subtract(1, 'month'));
  },

  clone () {
    return new DateUtil(this._date.clone());
  },

  moment () {
    return this._date;
  }
}

export default DateUtil;
