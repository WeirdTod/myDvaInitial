import React from 'react';
import { Table, Switch, Select, Popconfirm, message } from 'antd';
import styles from './UserList.less';
import MenuConfig from '../MenuConfig';

const { Option } = Select;

const powerDataHandler = (data) => {
	let list = [];
	
	(function dataFilter (data){
		for (var i in data){
			data[i].hasOwnProperty('children') ?
				dataFilter(data[i].children) :
				list.push([ data[i].power, data[i].name ]);
		}
	})(data);

	return list;
}

const columnsProductor = function () {
	const powerData = powerDataHandler(MenuConfig);
	const columns =  [{
		title: '用户名',
		dataIndex: 'name',
		key: 'name',
	}, {
		title: '备注',
		dataIndex: 'about',
		key: 'about',
	}, {
		title: '邮箱',
		dataIndex: 'email',
		key: 'email',
	}, {
		title: '权限',
		dataIndex: 'power',
		key: 'power',
		width: '40%',
		render: (text, record) => {
			const list = text.split('');
			const children = powerData.map((item, index) => {
				return (
					<Option key={item[0]}>{item[1]}</Option>
				);
			});

			return (
				<Select
				 className={styles.select}
				 defaultValue={list}
				 mode={'multiple'}
				>
					{children}
				</Select>
			);
		},
	}, {
		title: '操作',
		dataIndex: 'operation',
		key: 'operation',
		render: (text, record) => {
			return (
				<div className={styles.edit}>
					<a>编辑</a>
					<Popconfirm
					 title='确定删除吗?'
					 cancelText='取消'
					 okText='确定'
					 onConfirm={() => this.confirm('test')}
					>
						<a>删除</a>
					</Popconfirm>
				</div>
			);
		},
	}, {
		title: '禁用',
		dataIndex: 'disable',
		key: 'disable',
		render: (text, record) => {
			const color = text == 0 ? '' : '#f37070';
			return (
				<Switch
				 checked={!text == 0}
				 checkedChildren='解禁'
				 unCheckedChildren='禁用'
				 style={{backgroundColor: color}}
				/>
			);
		}
	}];
	return columns;
}

class UserList extends React.Component {

	constructor (props) {
		super(props);

		this.columns = columnsProductor.call(this);
	}

	confirm (str) {
		message.info(str);
	}

	render () {
		const { list, loading } = this.props;
		return (
			<Table
			  dataSource={list}
			  columns={this.columns}
			  loading={loading}
			  rowKey={record => record.id}
			/>
		);
	}

}

export default UserList;