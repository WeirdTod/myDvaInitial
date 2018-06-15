import React from 'react';
import { Router, Route, Switch, Link } from 'dva/router';

import { Layout, Input } from 'antd';

import IndexPage from './routes/IndexPage';
import Users from './routes/Users';
import Principal from './routes/Principal';
import Navigation from './routes/Navigation';
import Crumbs from './routes/Crumbs';
import MenuConfig from './components/MenuConfig';

import styles from './router.less';

const { Sider, Header, Content, Footer } = Layout;

function RouterConfig({ history, hashHistory }) {
  return (
    <Router history={history}>
    	<Layout>
    		<Sider
    		 theme='light'
    		>
    			<Route paht="/:name" component={Navigation} />
    		</Sider>
    		<Layout>
    			<Header theme='light' className={styles.layout}>
    				<Route path="/:name" component={Crumbs} />
    			</Header>
    			<Content>
    				<Switch>
			        	<Route path="/home" exact component={IndexPage} breadcrumbName="Home" />
			        	<Route path="/home/users" component={Users} breadcrumbName="用户" />
			        	<Route path="/home/principal" component={Principal} breadcrumbName="责任人" />
			      	</Switch>
    			</Content>
    		</Layout>
    	</Layout>
    </Router>
  );
}

export default RouterConfig;
