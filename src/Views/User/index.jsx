import React, {Component} from 'react'
import ContentList from '../../Components/ContentList'
import {Button, Modal, Input, notification, Icon} from 'antd'
import Axios from 'axios'
const columns = [
    {
        title: "Name",
        dataIndex: "name"
    },
    {
        title: "Sex",
        dataIndex: "sex"
    },
    {
        title: "Telephone",
        dataIndex: "telephone"
    },
    {
        title: "Option",
        dataIndex: "option"
    }
];

export default class User extends Component {
    state = {
        id: '',
        data: [],
        visible: false,
        confirmLoading: false,
        newPsw: '',
        newPsw2: ''
    };
    componentDidMount() {
        Axios.get('/api/users/list').then(res => {
            console.log(res.data);
            this.setState({
                data: res.data
            })
        })
    }
    showModal = (id) => {
        this.setState({
            visible: true,
            id
        });
    };
    handleOk = () => {
        if (this.state.newPsw !== this.state.newPsw2) {
            notification.open({
                message: 'tips',
                description:
                    '两次密码不一致',
                icon: <Icon type="cry" style={{ color: '#108ee9' }} />,
            });
        } else {
            Axios({
                url: '/api/users/update',
                method: 'put',
                data:{
                    id:this.state.id,
                    newpsw: this.state.newPsw
                }
            }).then(res => {
                console.log(res.data.nModified)
                if (res.data.nModified === 1) {
                    notification.open({
                        message: 'tips',
                        description:
                            '密码修改成功',
                        icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
                    });
                    this.setState({
                        visible: false,
                        confirmLoading: false
                    });
                }
            })
        }
    };
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    };
    updateHandle = (e) => {
        this.setState({
            newPsw: e.target.value
        })
    };
    updateHandle2 = (e) => {
        this.setState({
            newPsw2: e.target.value
        })
    };

    render() {
        const data = this.state.data.map(item => {
            return (
                {
                    key: item._id,
                    name: item.username,
                    sex: item.sex === '1' ? '男' : '女',
                    telephone: item.tel,
                    option: (
                        <div>
                            <Button type="primary" id="remmand" size="small" onClick={this.showModal.bind(this, item._id)}>修改</Button>
                            <Button type="danger" id="remmand" size="small">删除</Button>
                            <Button type="danger" id="remmand" size="small">冻结</Button>
                        </div>
                    )
                }
            )
        });
        const { visible, confirmLoading } = this.state;
        return (
            <div>
                <Modal
                    title="Title"
                    visible={visible}
                    onOk={this.handleOk.bind(this, this.state.id)}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <Input placeholder="新密码" type='password' style={{marginBottom:16}} value={this.state.newPsw} onChange={this.updateHandle}/>
                    <Input placeholder="确认新密码" type='password' style={{marginBottom:16}} value={this.state.newPsw2} onChange={this.updateHandle2}/>
                </Modal>
                <ContentList columns={columns} data={data}/>
            </div>
        )
    }
}