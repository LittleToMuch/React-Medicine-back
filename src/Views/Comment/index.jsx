import React, {Component} from 'react'
import ContentList from "../../Components/ContentList";
import Details from "./details";
import Axios from "axios";
import {Button, Modal, Popconfirm, message} from "antd";

export default class Comment extends Component {
    state = {
        datalist: [],
        visible: false,
        detail:null,
        columns :[
            {
                title: "姓名",
                dataIndex: "name"
            },
            {
                title: "年龄",
                dataIndex: "age"
            },
            {
                title: "性别",
                dataIndex: "sex"
            },
            {
                title: "病症",
                dataIndex: "feel"
            },
            {
                title: "Option",
                dataIndex: "option"
            }
        ],
    }
    componentDidMount() {
        Axios.get('/api/question/info/list').then(res => {
            console.log(res.data)
            this.setState({
                datalist: res.data
            })
        })
    }
    showModal = (id) => {
        console.log(id)
        Axios.get('/api/question/findOnly',{params:{id}}).then(res => {
            this.setState({detail: res.data})
        })
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };
    confirm = (id, ind) => {
        Axios({
            url: '/api/question/info/delete',
            method: 'delete',
            data:{
                id
            }
        }).then(res => {
            if (res.data.delete === 1) {
                message.success('删除成功');
                this.setState({
                    datalist: this.state.datalist.filter((v, i) => i !== ind)
                })
            }
        })
    }

    cancel = (e) => {
        message.error('取消操作');
    }

    render() {
        const data = this.state.datalist.map((item, index) => {
            return (
                {
                    key: item._id,
                    name: item.name,
                    age: item.age,
                    sex: item.sex,
                    feel: item.feel,
                    option: (
                        <div>
                            <Button type="primary" id="remmand" size="small" onClick={this.showModal.bind(this, item._id)}>详情</Button>
                            <Popconfirm
                                title="Are you sure delete this task?"
                                onConfirm={this.confirm.bind(this, item._id, index)}
                                onCancel={this.cancel}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button type="danger" id="remmand" size="small">删除</Button>
                            </Popconfirm>
                        </div>
                    )
                }
            )
        });
        return (
            <div>
                <ContentList columns={this.state.columns} data={data}/>
                <Modal
                    title="详情"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    {
                        this.state.detail ? <Details {...this.state.detail}/> : null
                    }
                </Modal>
            </div>
        )
    }
}