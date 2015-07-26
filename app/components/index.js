import React, {Component} from 'react/addons';
import {State as RouterState, Navigation} from 'react-router';

const Index = React.createClass({
	mixins: [RouterState, Navigation],

	render () {
		return (
			<div>{this.props.children}</div>
		);
	}
});

export default Index;
