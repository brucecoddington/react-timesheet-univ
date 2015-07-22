import React, {PropTypes} from 'react/addons';
import classNames from 'classnames';

import SnackbarStore from '../../stores/snackbar.store';
import SnackbarActions from '../../actions/snackbar.actions';

const Snackbar = React.createClass({

  store: SnackbarStore,

  getInitialState () {
    return {
      message: '',
      messageType: ''
    };
  },

  componentWillMount () {
    this.store.addChangeListener(this.notify);
  },

  componentWillUnmount () {
    this.store.removeChangeListener(this.notify);
  },

  notify () {
    this.setState(this.store.getState());
  },

  hide () {
    SnackbarActions.hide();
  },

  render () {

    let classes = classNames('ui inline snackbar top right', {
      'hide':     !this.state.message.length,
      'success':  this.state.messageType === 'success',
      'info':     this.state.messageType === 'info',
      'error':    this.state.messageType === 'error'
    });

    return (
      <div className={classes}>
        <span className="title">{this.state.message}</span>
        <i className="fa fa-close" onClick={this.hide} />
      </div>
    )
  }
});

export default Snackbar;
