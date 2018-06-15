import React from 'react';

import { Menu, Icon } from 'antd';

import { Link } from 'dva/router'

import styles from './Navigation.less';
import MenuConfig from '../components/MenuConfig';

const { SubMenu } = Menu;

class Navigation extends React.Component {

	constructor (props) {
		super(props);
		this.selectedKeys = [];
		this.firstPathName = '/home';
	}

	subItem (data) {
		return (
			<SubMenu
			 key={data.id}
			 title={
			 	<div>
			 		<Icon type={data.icon} />
			 		<span>{data.name}</span>
			 	</div>
			 }
			>
				{data.children.map(item => {
					return this.menuItem({...item, parent: data});
				})}
			</SubMenu>
		);
	}

	menuItem (data) {
		const pathname = this.props.location.pathname;

		const path = 
			data.hasOwnProperty('parent') ?
			`${this.firstPathName}/${data.parent.path}/${data.path}` :
			`${this.firstPathName}/${data.path}`;

		const isMatch = pathname === path;

		this.selectedKeys = 
			isMatch ?
			[data.id.toString()] :
			this.selectedKeys;

		const myLink = 
			isMatch ?
			null :
			<Link to={path} />;
		
		return (
			<Menu.Item
			 key={data.id}
			>
				<Icon type={data.icon} />
				<span>{data.name}</span>
				{myLink}
			</Menu.Item>
		);
	}

	itemsCreater (list) {
		const items = list.map(item => {
			return item.hasOwnProperty('children') ?
			this.subItem(item) :
			this.menuItem(item);
		});
		return items;
	}

	render () {
		const items = this.itemsCreater(MenuConfig);
		return (
			<Menu
			 mode='inline'
			 selectedKeys={this.selectedKeys}
			>
				{items}
			</Menu>
		);
	}

}

export default Navigation;