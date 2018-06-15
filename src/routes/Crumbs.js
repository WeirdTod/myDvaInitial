import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'dva/router';
import styles from './Crumbs.less';

import MenuConfig from '../components/MenuConfig';

const CrumbsConfig = (datas) => {
	const obj = {home: 'home'};

	const handleCrumbsConfig = (datas) => {
		for (var i in datas){
			const path = datas[i].path === '' ?
				'/' : datas[i].path
			obj[path] = datas[i].name;
			datas[i].hasOwnProperty('children') ?
				handleCrumbsConfig(datas[i].children) :
				void 0;
		}
	}

	handleCrumbsConfig(datas);

	return obj;
}

class Crumbs extends React.Component {
	constructor(props) {
		super(props);
		this.obj = CrumbsConfig(MenuConfig);
	}

	itemRender(route, params, routes, paths) {
	  const last = routes.indexOf(route) === routes.length - 1;
	  return last ? 
	  <span>{route.breadcrumbName}</span> : 
	  <a>{route.breadcrumbName}</a>;
	}

	createCrumbRoutes (pathname) {
		const list = pathname.split('/').filter(i => i !== '');
		const datas = list.map(item => ({
			path: item,
			breadcrumbName: this.obj[item], 
		}));
		return datas;
	}

	render () {
		const pathname = this.props.location.pathname;
		const routes = this.createCrumbRoutes(pathname);
		return (
			<div className={styles.crumbs}>
				<div className={styles.first}></div>
				<div>
					<Breadcrumb style={{lineHeight: '100%'}} itemRender={this.itemRender} routes={routes} />
				</div>
			</div>
		);
	}
}

export default Crumbs;