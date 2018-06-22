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
		const { users, dispatch } = this.props;
		const data = {...users, dispatch};
		return (
			<div>
				<UserList {...data} />
			</div>
		);
	}
}

//指定订阅数据,关联users
function mapStateToProps({ users, dispatch }){
	return { users, dispatch };
}

export default connect(mapStateToProps)(Users);