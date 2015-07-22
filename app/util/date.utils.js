import _ from 'lodash';
import moment from 'moment';

export default {

  // Nov 18, 2013
  momentShortDate (dateString) {
    return this.nullOrUndefined(dateString) || moment(dateString).format("MMM D, YYYY");
  },

  // November 18th, 2013
  momentLongDate (dateString) {
    return this.nullOrUndefined(dateString) || moment(dateString).format("MMMM Do, YYYY");
  },

  nullOrUndefined (dateString) {
    return (_.isUndefined(dateString) || dateString === null ? 'None' : false);
  }
};
