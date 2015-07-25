import React, {PropTypes} from 'react/addons';
import Router, {Navigation, State} from 'react-router';
import _ from 'lodash';

import EmployeeTable from './employee.table';
import EmployeeActions from '../../actions/employee.actions';
import EmployeeStore from '../../stores/employee.store';
import Paginator from '../common/navigation/paginator';

const Employees = React.createClass({

  statics: {
    fetch (params, query) {
      return EmployeeStore.list({action: {query: {page: 1}}});
    }
  },

  mixins: [
    Navigation,
    State
  ],

  store: EmployeeStore,

  requestEmployees: EmployeeActions.list,

  getInitialState () {
    return this.store.getState();
  },

  createNew () {
    this.transitionTo('employees.create');
  },

  onChange () {
    this.setState(this.store.getState());
  },

  componentWillMount () {
    if (this.state.pageConfig.data.length === 0) {
      this.requestEmployees({page: 1});
    }
    this.store.addChangeListener(this.onChange);
  },

  componentWillUnmount () {
    this.store.removeChangeListener(this.onChange);
  },

  onPageChange (page) {
    this.requestEmployees({page: page});
  },

  render () {

    let numPages = Math.ceil(this.state.pageConfig.totalItems / 5);
    let pagesShown = Math.min(numPages, 5);

    return (
      <div>
        <div className="row">
          <button className="ui right floated primary button pad-bottom" type="button" onClick={this.createNew}>
            New Employee
          </button>
        </div>

        <div className="row">
          <EmployeeTable employees={this.state.pageConfig.data} store={this.store} />
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

export default Employees;
