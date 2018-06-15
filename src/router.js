import React from 'react';
import { Router, Route, Switch, Link } from 'dva/router';

import { Layout, Input, Icon } from 'antd';

import IndexPage from './routes/IndexPage';
import Users from './routes/Users';
import Principal from './routes/Principal';
import Navigation from './routes/Navigation';
import Crumbs from './routes/Crumbs';
import MenuConfig from './components/MenuConfig';

import styles from './router.less';

const { Sider, Header, Content, Footer } = Layout;

class RouterConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
    }

    toggle() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render () {
        return (
            <Router history={this.props.history}>
                <Layout>
                    <Sider
                     theme='light'
                    >
                        <Route paht="/:name" component={Navigation} />
                    </Sider>
                    <Layout>
                        <Header theme='light' className={styles.layout}>
                            <Icon type="menu-fold" onClick={this.toggle} />
                            <Route path="/:name" component={Crumbs} />
                        </Header>
                        <Content>
                            <Switch>
                                <Route path="/home" exact component={IndexPage} breadcrumbName="Home" />
                                <Route path="/home/users" component={Users} breadcrumbName="用户" />
                                <Route path="/home/principal" component={Principal} breadcrumbName="责任人" />
                            </Switch>
                        </Content>
                        <Footer>
                            <h3>Designed by ZKYK.iot.</h3>
                        </Footer>
                    </Layout>
                </Layout>
            </Router>
        );
    }
}

function Relay({ history }){
    return (
        <RouterConfig history={history} />
    );
}

export default Relay;
