let React = require('react/addons');

export default function (componentName, mockTagName) {
  return React.createClass({
    displayName: componentName || 'MockComponent',

    render: () => {
      let mockTagName = mockTagName || "div";
      
      return React.DOM[mockTagName]({
        className: this.props.className
      },
      this.props.children);
    }
  });
};