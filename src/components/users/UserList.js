import React from 'react';
import { Table } from 'antd';

const UserList = ({ list, loading }) => {
	const columns = [{
		title: '用户名',
		dataIndex: 'name',
		key: 'name',
	}, {
		title: '备注',
		dataIndex: 'about',
		key: 'about',
	}];

	return (
		<Table
		  dataSource={list}
		  columns={columns}
		  loading={loading}
		  rowKey={record => record.id}
		/>
	);
}

export default UserList;