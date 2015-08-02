import React, {PropTypes} from 'react/addons';

import classNames from 'classnames';
import _ from 'lodash';
import Router, {Link, Navigation} from 'react-router';

import LoginStore from '../../../stores/login.store';
import LoginActions from '../../../actions/login.actions';

const NavBar = React.createClass({

  mixins: [Navigation],

  propTypes: {
    location: PropTypes.object.isRequired
  },

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

  isActive (segments, include, exclude) {
    return _.includes(segments, include) && !_.includes(segments, exclude);
  },

  render  () {
    let segments = this.props.location.pathname.split('/');

    let projectsClasses = classNames('item', {
      active: this.isActive(segments, 'projects')
    });

    let employeesClasses = classNames('item', {
      active: this.isActive(segments, 'employees', 'timesheets')
    });

    let timesheetsClasses = classNames('item', {
      active: this.isActive(segments, 'timesheets')
    });

    return (
      <div className="ui fixed menu fluid">
        <a className="header item" href="#">
          <i className="fa fa-clock-o fa-lg"/> {this.state.title}
        </a>

        <Link className={projectsClasses} activeClassName='' to="/projects">Projects</Link>
        <Link className={employeesClasses} activeClassName='' to="/employees">Employees</Link>
        <Link className={timesheetsClasses} activeClassName='' to={`/employees/${this.state.user._id}/timesheets`}>Timesheets</Link>

        <a ref="logoutButton" className="right item logout" onClick={this.logout}>
          <i className="fa fa-power-off"/> Logout
        </a>
      </div>
    );
  }
});

export default NavBar;
