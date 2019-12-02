import React, { Component } from 'react'
import {Layout, Breadcrumb} from "antd"
import List from '../List'
import style from "./index.module.css"
const {Content} = Layout
export default class ContentList extends Component {
    render() {
        return (
            <div className={style.contentlist}>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        style={{
                            background: '#fff',
                            padding: 24,
                            margin: 0,
                            minHeight: 620,
                        }}
                    >
                        <List {...this.props} ref='www'/>
                    </Content>
                </Layout>
            </div>
        )
    }
}
