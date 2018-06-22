import React from 'react';
import {
	Table,
	Switch,
	Select,
	Popconfirm,
	message,
	Input
} from 'antd';
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
		render: (text, record) => {
			return this.renderColumns(text, record, 'name');
		},
	}, {
		title: '备注',
		dataIndex: 'about',
		key: 'about',
		render: (text, record) => {
			return this.renderColumns(text, record, 'about');
		},
	}, {
		title: '邮箱',
		dataIndex: 'email',
		key: 'email',
		render: (text, record) => {
			return this.renderColumns(text, record, 'email');
		},
	}, {
		title: '权限',
		dataIndex: 'power',
		key: 'power',
		width: '40%',
		render: (text, record) => {
			const list = text.split('');
			const children = powerData.map((item) => {
				return (
					<Option key={item[0]}>{item[1]}</Option>
				);
			});

			return (
				<Select
				 className={styles.select}
				 value={list}
				 mode={'multiple'}
				 disabled={!record.editable}
				 onChange={(value) => this.handleChange(record.id, 'power', value.sort().join(''))}
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
			const { editable } = record;
			return (
				<div className={styles.edit}>
					{
						editable ? 
						<div>
							{
								this.isTheSame(record).equal ?
								<div>
									<span>提交</span>
									<a
									 onClick={() => this.cancel(record)}
									>取消</a>
								</div> :
								<div>
									<a
									 onClick={() => this.isTheSame(record)}
									>提交</a>
									<Popconfirm
									 title='数据已修改,确定取消吗?'
									 onConfirm={() => this.cancel(record)}
									>
										<a>取消</a>
									</Popconfirm>
									
								</div>
							}
						</div> :
						<div>
							<a
							 onClick={() => this.edit(record.id, record)}
							>编辑</a>
							<Popconfirm
							 title='确定删除吗?'
							 cancelText='取消'
							 okText='确定'
							 onConfirm={() => this.confirm('test')}
							>
								<a>删除</a>
							</Popconfirm>
						</div>
					}
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

const objectIsEqual = function(a, b){
	const propsA = Object.getOwnPropertyNames(a);
	const propsB = Object.getOwnPropertyNames(b);
	if (propsA.length !== propsB.length) {
		return false;
	}
	for (let i=0; i < propsA.length; i++){
		if (a[propsA[i]] !== b[propsA[i]]) {
			return false;
		}
	}
	return true;
}

class UserList extends React.Component {

	constructor (props) {
		super(props);

		this.columns = columnsProductor.call(this);
	}

	runTest () {
		console.log('runTest');
	}

	createCacheList () {
		this.cacheList = this.props.list.map(item => ({...item}));
	}

	isTheSame (record) {
		if (!this.cacheList) {return};
		const target = Object.assign({}, {
			...this.cacheList.filter(item => item.id === record.id)[0]
		});
		record.editable ? target.editable = record.editable : void 0;

		return {equal: objectIsEqual(record, target), cache: target};
	}

	renderColumns (text, record, column) {
		const { editable } = record;
		return (
			editable ?
			<Input
			 onChange={(e) => this.handleChange(record.id, column, e.target.value)}
			 value={text} /> :
			<span>{text}</span>
		);
	}

	dataCache (data) {
		if (this.cacheList) {
			this.cacheList = this.cacheList.map(item => {
				return item.id === data.id ? data : item;
			});
		}else{
			this.createCacheList();
		}
	}

	edit (id, record) {
		this.dataCache(record);
		this.props.dispatch({
			type: 'users/setEditable',
			payload: {
				id,
				editable: true,
			},
		});
	}

	cancel (record) {
		const { id } = record;
		const { cache } = this.isTheSame(record);
		this.props.dispatch({
			type: 'users/cancel',
			payload: {
				id,
				value:cache,
			}
		});
	}

	confirm (str) {
		message.info(str);
	}

	handleChange (id, column, value) {
		this.props.dispatch({
			type: 'users/handleChange',
			payload: {
				id,
				column,
				value,
			}
		});
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