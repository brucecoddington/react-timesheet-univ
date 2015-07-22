import React, {PropTypes} from 'react/addons';
import classNames from 'classnames';
import _ from 'lodash';
import Router, {Link, State, Navigation} from 'react-router';

import LoginStore from '../../../stores/login.store';
import LoginActions from '../../../actions/login.actions';

const NavBar = React.createClass({

  mixins: [
    State,
    Navigation
  ],

  getInitialState () {
    let loggedInUser = LoginStore.getState().user;
    let userId = (loggedInUser !== null && loggedInUser._id) ? loggedInUser._id : 'all';

    return {
      title: 'Timesheetz',
      user: {
        _id: userId
      }
    };
  },

  logout () {
    LoginActions.logout();
  },

  onLoginChange () {
    let loginState = LoginStore.getState();

    this.setState({
      user: loginState.user
    });
  },

  componentWillMount () {
    LoginStore.addChangeListener(this.onLoginChange);
  },

  componentWillUnmount () {
    LoginStore.removeChangeListener(this.onLoginChange);
  },

  render  () {
    let activeRoutes = _.pluck(this.getRoutes(), 'name').join('.').split('.');

    let projectsClasses = classNames('item', {
      active: _.contains(activeRoutes, 'projects')
    });

    let employeesClasses = classNames('item', {
      active: _.contains(activeRoutes, 'employees')
    });

    let timesheetsClasses = classNames('item', {
      active: _.contains(activeRoutes, 'timesheets')
    });

    return (
      <div className="ui fixed menu fluid">
        <a className="header item" href="#">
          <i className="fa fa-clock-o fa-lg"/> {this.state.title}
        </a>

        <Link className={projectsClasses} to="projects">Projects</Link>
        <Link className={employeesClasses} to="employees">Employees</Link>
        <Link className={timesheetsClasses} to="timesheets" params={{user_id: this.state.user._id}}>Timesheets</Link>

        <a ref="logoutButton" className="right item logout" onClick={this.logout}>
          <i className="fa fa-power-off"/> Logout
        </a>
      </div>
    );
  }
});

export default NavBar;
