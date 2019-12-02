import React, { Component } from 'react'
import { Menu, Icon } from 'antd';
import {withRouter} from 'react-router';
import style from './index.module.css'
const { SubMenu } = Menu;
export default withRouter(class Tabbar extends Component {
    jumpLink = (value) => {
        switch (value) {
            case 1:
                this.props.history.push("/home/user");
                return;
            case 2:
                this.props.history.push("/home/message");
                return;
            case 3:
                this.props.history.push("/home/comment");
                return;
            case 4:
                this.props.history.push("/home/order");
                return;
            case 6:
                this.props.history.push("/home/medicinal");
                return;
            case 8:
                this.props.history.push("/home/doctor");
                return;
        }
    };
    render() {
        return (
            <div className={style.container}>
                <div style={{ width: 256 }}>
                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        theme="light"
                    >
                        <Menu.Item key="1" onClick={this.jumpLink.bind(this,1)}>
                            <Icon type="pie-chart" />
                            <span>
                                用户列表
                            </span>
                        </Menu.Item>
                        <Menu.Item key="2" onClick={this.jumpLink.bind(this,2)}>
                            <Icon type="desktop" />
                            <span>评论管理</span>
                        </Menu.Item>
                        <Menu.Item key="3" onClick={this.jumpLink.bind(this,3)}>
                            <Icon type="inbox" />
                            <span>留言管理</span>
                        </Menu.Item>
                        <Menu.Item key="4" onClick={this.jumpLink.bind(this,4)}>
                            <Icon type="inbox" />
                            <span>订单管理</span>
                        </Menu.Item>
                        <SubMenu
                            key="sub1"
                            title={
                                <span>
                                    <Icon type="mail" />
                                    <span>药材管理</span>
                                </span>
                            }
                        >
                            <Menu.Item key="5" onClick={this.jumpLink.bind(this,5)}>添加药材</Menu.Item>
                            <Menu.Item key="6" onClick={this.jumpLink.bind(this,6)}>药材列表</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            title={
                                <span>
                                    <Icon type="appstore" />
                                    <span>医师管理</span>
                                </span>
                            }
                        >
                            <Menu.Item key="7" onClick={this.jumpLink.bind(this,7)}>添加医师</Menu.Item>
                            <Menu.Item key="8" onClick={this.jumpLink.bind(this,8)}>医师列表</Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
            </div>
        )
    }
})