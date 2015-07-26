import React, {PropTypes} from 'react/addons';
import Router, {Navigation} from 'react-router';
import _ from 'lodash';

import TimesheetTable from './timesheet.table';
import TimesheetActions from '../../actions/timesheet.actions';
import TimesheetStore from '../../stores/timesheet.store';
import LoginStore from '../../stores/login.store';

import Paginator from '../common/navigation/paginator';
import SectionHeader from '../common/section';

let Timesheets = React.createClass({

  statics: {
    fetch (params, query) {
      return TimesheetStore.list({action: {query: {page: 1}}});
    }
  },

  mixins: [Navigation],

  store: TimesheetStore,

  requestTimesheets: TimesheetActions.list,

  getInitialState () {
    return this.store.getState();
  },

  createNew () {
    return this.transitionTo(`/employees/${LoginStore.getUserId()}/timesheets`);
  },

  onChange () {
    this.setState(this.store.getState());
  },

  componentWillMount () {
    if (this.state.timesheets.data.length === 0) {
      this.requestTimesheets({page: 1});
    }
    this.store.addChangeListener(this.onChange);
  },

  componentWillUnmount () {
    this.store.removeChangeListener(this.onChange);
  },

  onPageChange (page) {
    this.requestTimesheets({page: page});
  },

  render () {

    let numPages = Math.ceil(this.state.timesheets.totalItems / 5);
    let pagesShown = Math.min(numPages, 5);

    return (
      <div>
        <div className="row">
          <SectionHeader header='Timesheets' />
        </div>
        <div className="row">
          <button className="ui right floated primary button pad-bottom" type="button" onClick={this.createNew}>
            New Timesheet
          </button>
        </div>

        <div className="row">
          <TimesheetTable timesheets={this.state.timesheets.data} store={this.store} />
        </div>

        <div className="ui grid pad-top">
          <div className="centered row">
            <Paginator max={numPages} maxVisible={pagesShown} onChange={this.onPageChange} />
          </div>
        </div>
      </div>
    );
  }
});

export default Timesheets;
