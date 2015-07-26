import React, {PropTypes} from 'react/addons';

const Popover = React.createClass({

  displayName: 'Popover',

  propTypes: {
    children:   PropTypes.object,
    className:  PropTypes.string
  },

  componentWillMount () {
    window.popoverContainer = document.createElement('span');
    window.popoverContainer.className = 'datepicker-calendar-container';

    this._popoverElement = window.popoverContainer;

    document.querySelector('body').appendChild(this._popoverElement);
  },

  componentDidMount () {
    this._renderPopover();
  },

  componentDidUpdate () {
    this._renderPopover();
  },

  _popoverComponent () {
    let className = this.props.className;
    return (
      <div className={className}>
        <div className="datepicker-calendar-popover-content">
          {this.props.children}
        </div>
      </div>
    );
  },

  _tetherOptions () {
    return {
      element: this._popoverElement,
      target: this.getDOMNode().parentElement,
      attachment: 'top left',
      targetAttachment: 'bottom left',
      targetOffset: '10px 0',
      optimizations: {
        moveElement: false // always moves to <body> anyway!
      },
      constraints: [
        {
          to: 'scrollParent',
          attachment: 'together',
          pin: true
        }
      ]
    };
  },

  _renderPopover () {
    React.render(this._popoverComponent(), this._popoverElement);
    if (this._tether != null) {
      this._tether.setOptions(this._tetherOptions());
    } else {
      let Tether = require('tether');
      this._tether = new Tether(this._tetherOptions());
    }
  },

  componentWillUnmount () {
    this._tether.destroy();
    React.unmountComponentAtNode(this._popoverElement);
    if (this._popoverElement.parentNode) {
      this._popoverElement.parentNode.removeChild(this._popoverElement);
    }
  },

  render () {
    return <span/>;
  }
});

export default Popover;
