import React, {Component} from 'react'
import {Table} from "antd";
import './index.scss'

export default class List extends Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
    };
    onSelectChange = selectedRowKeys => {
        this.setState({selectedRowKeys});
    };

    render() {
        const {selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true,
        };
        return (
            <Table rowSelection={rowSelection} columns={this.props.columns} dataSource={this.props.data} ref='eee'/>
        )
    }
}
