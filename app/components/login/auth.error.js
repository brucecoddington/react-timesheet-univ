import React, {PropTypes} from 'react/addons';

const AuthError = React.createClass({

  propTypes: {
    authError: PropTypes.string
  },

  render () {
    if (this.props.authError) {
      return (
        <div className="row">
          <div className="sixteen wide column">
            <div className="ui secondary inverted raised red segment">
              {this.props.authError}
            </div>
          </div>
        </div>
      );
    }
    else {
      return (<div />);
    }
  }
});

export default AuthError;
