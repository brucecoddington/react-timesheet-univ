import React, {Component} from 'react/addons';
import {RouteHandler, State, Navigation} from 'react-router';

const Index = React.createClass({
	mixins: [
    State,
    Navigation
  ],

	render () {
		return <RouteHandler />;
	}
});

export default Index;
