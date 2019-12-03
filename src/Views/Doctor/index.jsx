import React, {Component} from 'react'
import ContentList from '../../Components/ContentList'
import Axios from "axios";
import {Modal, Button, Input, notification, Icon, Popconfirm, message} from "antd";
import Avatar from "../../Components/Upload";

export default class Doctor extends Component {
    state = {
        id: '',
        ind: '',
        name: '',
        department: '',
        tags: '',
        introduction: '',
        level: '',
        price: '',
        path: '',
        ModalText: '',
        datalist: [],
        visible: false,
        columns: [
            {
                title: "头像",
                dataIndex: "pic"
            },
            {
                title: "姓名",
                dataIndex: "name"
            },
            {
                title: "专业",
                dataIndex: "department"
            },
            {
                title: "职称",
                dataIndex: "level"
            },
            {
                title: "Option",
                dataIndex: "option"
            }
        ]
    }

    componentDidMount() {
        Axios.get("/api/doctor/list").then(res => {
            let {data} = res.data;
            console.log(data);
            this.setState({
                datalist: data
            })
        })
    }

    showModal = (id, ind) => {
        this.setState({
            visible: true,
            id,
            ind
        });
        Axios({
            method: 'post',
            url: '/api/doctor/only',
            data: {
                id: id
            }
        }).then(res => {
            console.log(res.data[0]);
            this.setState({
                name: res.data[0].name,
                department: res.data[0].department,
                tags: res.data[0].tags,
                introduction: res.data[0].introduction,
                level: res.data[0].level,
                price: res.data[0].price
            })
        })
    };
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };
    handleOk = (id) => {
        this.setState({
            ModalText: '正在提交',
            confirmLoading: true,
        });
        let {name, department, tags, introduction, level, price, path} = this.state;
        Axios({
            method: 'put',
            url: '/api/doctor/update',
            data:{
                id,name,department,tags,introduction,level,price,pic:path
            }
        }).then(res => {
            if (res.data.update === 1) {
                this.setState({
                    visible: false,
                    confirmLoading: false,
                    datalist: this.state.datalist.map((item,index)=>index === this.state.ind ? {...res.data.result[0]} : item)
                })
            }
        });
    };
    handleChange = (key, e) => {
        this.setState({
            [key]: e.target.value
        })
    };
    deleteHandle = (id, index) => {
        Axios({
            url: '/api/doctor/delete',
            method: 'delete',
            data:{id}
        }).then(res => {
            if (res.data.deletedCount === 1) {
                let list = [...this.state.datalist];
                for (let i = 0 ;i < list.length; i++) {
                    if (i === index) {
                        list.splice(i,1)
                    }
                }
                this.setState({
                    datalist: list
                })
                notification.open({
                    message: 'tips',
                    description:
                        '删除成功',
                    icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
                });
            }
        })
    };
    cancel = () => {
        message.error('取消操作');
    };
    confirm = (id, index) => {
        this.deleteHandle(id, index)
    };
    onAvatar = (path) => {
        this.setState({
            path
        })
    }
    render() {
        const data = this.state.datalist.map((item,index) => {
            return (
                {
                    key: item._id,
                    name: item.name,
                    level: item.level,
                    department: item.department,
                    pic: <img src={item.pic} alt={item.name} style={{width: 60, height: 60}}/>,
                    option: (
                        <div>
                            <Button type="primary" id="remmand" size="small"
                                    onClick={this.showModal.bind(this, item.id, index)}>修改</Button>
                            <Button type="danger" id="remmand" size="small">冻结</Button>
                            <Popconfirm
                                title="确定删除吗?"
                                onConfirm={this.confirm.bind(this, item.id, index)}
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
        const {visible, confirmLoading, ModalText} = this.state;
        return (
            <div>
                <Modal
                    title="Title"
                    visible={visible}
                    onOk={this.handleOk.bind(this, this.state.id)}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >

                    姓名：<Input placeholder="Basic usage" style={{marginBottom: 16}} onChange={(e) => {
                    this.handleChange('name', e)
                }} value={this.state.name}/>
                    职称：<Input placeholder="Basic usage" style={{marginBottom: 16}} onChange={(e) => {
                    this.handleChange('level', e)
                }} value={this.state.level}/>
                    专业：<Input placeholder="Basic usage" style={{marginBottom: 16}} onChange={(e) => {
                    this.handleChange('department', e)
                }} value={this.state.department}/>
                    价格：<Input placeholder="Basic usage" style={{marginBottom: 16}} onChange={(e) => {
                    this.handleChange('price', e)
                }} value={this.state.price}/>
                    简介：<Input placeholder="Basic usage" style={{marginBottom: 16}} onChange={(e) => {
                    this.handleChange('introduction', e)
                }} value={this.state.introduction}/>
                    标签：<Input placeholder="Basic usage" style={{marginBottom: 16}} onChange={(e) => {
                    this.handleChange('tags', e)
                }} value={this.state.tags}/>
                    <Avatar onAvatar={this.onAvatar}/>

                </Modal>
                <ContentList columns={this.state.columns} data={data} ref='qqq'/>
            </div>
        )
    }
}