import React from 'react';

import { Router, Route, Switch, Link } from 'dva/router';
import { connect } from 'dva';
import UserList from '../components/users/UserList';

import { Button } from 'antd';

class Users extends React.Component {

	constructor (props) {
		super(props);
	}

	render () {
		const { users } = this.props;
		return (
			<div>
				<UserList {...users} />
			</div>
		);
	}
}

//指定订阅数据,关联users
function mapStateToProps({ users }){
	return { users };
}

export default connect(mapStateToProps)(Users);