import React, {Component} from 'react'
import ContentList from "../../Components/ContentList";
import CommentItem from "../../Components/CommentItem"
import Axios from 'axios'
import {Button, Modal} from "antd";
export default class Message extends Component {
    state = {
        columns :[
            {
                title: "药材名",
                dataIndex: "name"
            },
            {
                title: "分类",
                dataIndex: "check"
            },
            {
                title: "价格",
                dataIndex: "price"
            },
            {
                title: "图片",
                dataIndex: "pic"
            },
            {
                title: "Option",
                dataIndex: "option"
            }
        ],
        data: [],
        visible: false,
        comments: []
    };
    componentDidMount() {
        let list = [];
        Axios.get("/api/comment/list").then(res => {
            let {data} = res;
            for (let i = 0; i < data[1].length; i++) {
                let newList = data[0].filter(v => parseInt(v.shopId) === data[1][i].id);
                list.push({...data[1][i],comments:newList})
            }
            this.setState({
                data: list
            })
        })
    }
    showModal = (id) => {
        console.log(this.state.data)
        console.log(id)
        let comments = this.state.data.filter(item => item._id === id)[0].comments
        this.setState({
            visible: true,
            comments
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    deleteHandle = (index) => {
        this.setState({
            comments: this.state.comments.filter((item, ind) => ind !== index)
        })
    }

    render() {
        const data = this.state.data.map(item => {
            return (
                {
                    key: item._id,
                    name: item.shop_name,
                    check: item.type,
                    price: item.price,
                    pic: <img src={item.pic} alt={item.shop_name} style={{width:100,height:60}}/>,
                    option: (
                        <div>
                            <Button type="primary" id="remmand" size="small" onClick={this.showModal.bind(this, item._id)}>查看评论</Button>
                        </div>
                    )
                }
            )
        });
        return (
            <div>
                <ContentList columns={this.state.columns} data={data}/>
                <Modal
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <CommentItem comments={this.state.comments} deleteHandle={this.deleteHandle}/>
                </Modal>
            </div>
        )
    }
}