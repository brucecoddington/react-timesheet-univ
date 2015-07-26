import React, {PropTypes} from 'react/addons';
import classNames from 'classnames';
import _ from 'lodash';
import Router, {Link, Navigation} from 'react-router';

import LoginStore from '../../../stores/login.store';
import LoginActions from '../../../actions/login.actions';

const NavBar = React.createClass({

  mixins: [Navigation],

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

    return (
      <div className="ui fixed menu fluid">
        <a className="header item" href="#">
          <i className="fa fa-clock-o fa-lg"/> {this.state.title}
        </a>

        <Link className='item' to="/projects">Projects</Link>
        <Link className='item' to="/employees">Employees</Link>
        <Link className='item' to={`/employees/${this.state.user._id}/timesheets`}>Timesheets</Link>

        <a ref="logoutButton" className="right item logout" onClick={this.logout}>
          <i className="fa fa-power-off"/> Logout
        </a>
      </div>
    );
  }
});

export default NavBar;
