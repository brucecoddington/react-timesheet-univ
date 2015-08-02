import React, {Component} from 'react/addons';

const Index = React.createClass({

	render () {
		return (
			<div>{this.props.children}</div>
		);
	}
});

export default Index;
