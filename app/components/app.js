import _ from 'lodash';
import React, {PropTypes} from 'react/addons';
import Router from 'react-router';

import NavBar from './common/navigation/navbar';
import SectionHeader from './common/section';
import LoginStore from '../stores/login.store';
import Snackbar from './common/snackbar';
import SnackbarStore from '../stores/snackbar.store';

const App = React.createClass({

  statics: {
    // willTransitionTo (transition, params) {
    //   return LoginStore.requireAuthenticatedUser(transition);
    // }
  },

  render () {

    return (
      <div>
        <NavBar {...this.props}/>
        <div className="container">
          {this.props.children}
        </div>

        <Snackbar />
      </div>
    );
  }
});

export default App;
