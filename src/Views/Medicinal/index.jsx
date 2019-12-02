import React, {Component} from 'react'
import ContentList from "../../Components/ContentList";
import Axios from "axios";
import {Button} from "antd";
export default class Medicinal extends Component {
    state = {
        datalist: [],
        columns :[
            {
                title: "图片",
                dataIndex: "pic"
            },
            {
                title: "药材名称",
                dataIndex: "name"
            },
            {
                title: "价格",
                dataIndex: "price"
            },
            {
                title: "类别",
                dataIndex: "type"
            },
            {
                title: "Option",
                dataIndex: "option"
            }
        ],
    }
    componentDidMount() {
        Axios.get("/api/shop/shoplist").then(res => {
            console.log(res.data)
            this.setState({
                datalist: res.data
            })
        })
    }

    render() {
        const data = this.state.datalist.map(item => {
            return (
                {
                    key: item._id,
                    name: item.shop_name,
                    type: item.type,
                    price: item.price,
                    pic: <img src={item.pic} alt={item.shop_name} style={{width:100,height:60}}/>,
                    option: (
                        <div>
                            <Button type="primary" id="remmand" size="small">详情</Button>
                            <Button type="primary" id="remmand" size="small">修改</Button>
                            <Button type="danger" id="remmand" size="small">删除</Button>
                        </div>
                    )
                }
            )
        });
        return (
            <div>
                <ContentList columns={this.state.columns} data={data}/>
            </div>
        )
    }
}