import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd';
import { Route, Switch as RouterSWitch } from 'react-router-dom'
import News from '../News'
import People from '../People'
import Setting from '../Setting'
import AddArticle from '../News/AddArticle'
import store from '../../store'
import { Provider } from 'react-redux'
const { Header, Content, Sider } = Layout;


window.store = store

export default class Home extends Component {
    componentDidMount() {
    }
    render() {
        const { pathname } = this.props.history.location
        return (
            //react-redux
            <Provider store={store}>
                <Layout>
                    <Header className="header">
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['1']}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="1">首页</Menu.Item>
                            <Menu.Item key="2">登录/注册</Menu.Item>
                            <Menu.Item key="3">关于</Menu.Item>
                        </Menu>
                    </Header>
                    <Layout>
                        <Sider width={200} style={{ background: '#fff' }}
                        >
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={[pathname.indexOf('/home/people') !== -1 ? 'people' : pathname.indexOf('/home/setting') !== -1 ? 'setting' : 'news']}
                                style={{ height: '100%', borderRight: 0 }}
                            >
                                <Menu.Item key="news"
                                    onClick={() => {
                                        this.props.history.push('/')
                                    }}
                                >
                                    <Icon type="home" />
                                    <span className="nav-text">首页信息</span>
                                </Menu.Item>
                                <Menu.Item key="people"
                                    onClick={() => {
                                        this.props.history.push('/home/people')
                                    }}>
                                    <Icon type="user" />
                                    <span className="nav-text">人员信息</span>
                                </Menu.Item>

                                <Menu.Item key="setting"
                                    onClick={() => {
                                        this.props.history.push('/home/setting')
                                    }}>
                                    <Icon type="setting" />
                                    <span className="nav-text">用户设置</span>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Layout style={{ padding: '0 24px 24px' }}>
                            <Content
                                style={{
                                    background: '#fff',
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 210,
                                    minWidth: 425
                                }}
                            >
                                <RouterSWitch>
                                    <Route component={People} path='/home/people' />
                                    <Route component={News} path='/home/news' />
                                    <Route component={AddArticle} path='/home/add' />
                                    <Route component={Setting} path='/home/setting' />
                                </RouterSWitch>
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </Provider>
        )
    }
}
