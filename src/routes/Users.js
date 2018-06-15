import React from 'react';

import { Router, Route, Switch, Link } from 'dva/router';

import { Button } from 'antd';

const UserA = () => {
	return (
		<div>This is my users.</div>
	);
}

const UserB = () => {
	return (
		<div>This is my myPrincipal.</div>
	);
}

class Users extends React.Component {

	constructor (props) {
		super(props);
	}

	render () {
		return (
			<div>
				<Button>i am a button from Users.</Button>
				<Route path="userA" component={UserA} />
				<Route path="userB" component={UserB} />
			</div>
		);
	}
}

export default Users;