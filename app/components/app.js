import React, {PropTypes} from 'react/addons';
let Router from 'react-router');
let RouteHandler = RouteHandler;

let NavBar from './common/navigation/navbar');
let SectionHeader from './common/section');
let LoginStore from '../stores/login.store');

let Snackbar from './common/snackbar');
let SnackbarStore from '../stores/snackbar.store');

let App = React.createClass({

  statics: {
    willTransitionTo (transition, params) {
      return LoginStore.requireAuthenticatedUser(transition);
    }
  },

  render  () {

    return (
      <div>
        <NavBar />
        <div className="container">
          <SectionHeader />
          <div className="row">
            <RouteHandler />
          </div>
        </div>

        <Snackbar />
      </div>
    );
  }
});

export default App;
