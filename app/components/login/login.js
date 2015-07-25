import React, {PropTypes} from 'react/addons';

import LoginActions from '../../actions/login.actions';
import LoginStore from '../../stores/login.store';
import AuthError from './auth.error';

const LoginForm = React.createClass({

  store: LoginStore,

  getInitialState () {
    return this.store.getState();
  },

  onChange () {
    this.setState(this.store.getState());
  },

  componentWillMount () {
    this.store.addChangeListener(this.onChange);
  },

  componentWillUnmount () {
    this.store.removeChangeListener(this.onChange);
  },

  validate (event) {
    this.state.credentials[event.target.name] = event.target.value;
    this.setState(this.state.credentials);
  },

  handleSubmit (event) {
    event.preventDefault();
    LoginActions.login(this.state.credentials);
  },

  render () {
    return (
      <div className="ui padded page grid">
        <div className="two column centered row">
          <div className="left aligned column">
            <h4>Welcome to Timesheetz</h4>
          </div>
          <div className="right aligned column">
            <h5>Please Login</h5>
          </div>
        </div>

        <hr/>

        <div className="centered row">
          <div className="center aligned eight wide column">
            <form className="ui form" name="loginForm" onSubmit={this.handleSubmit}>
              <div className="inline field">
                <label htmlFor="username">Username</label>
                <input type="text"
                  name="username" ref="login"
                  value={this.state.credentials.username}
                  onChange={this.validate} required />
              </div>
              <div className="inline field">
                <label htmlFor="password">Password</label>
                <input type="password"
                  name="password" ref="password"
                  value={this.state.credentials.password}
                  onChange={this.validate} required />
              </div>
              <div className="ui right aligned column">
                <button className="ui primary login button">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
});

export default LoginForm;
