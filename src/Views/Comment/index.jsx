import React, {Component} from 'react'
import ContentList from "../../Components/ContentList";
import Axios from "axios";
import {Button} from "antd";

export default class Comment extends Component {
    state = {
        datalist: [],
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

    render() {
        const data = this.state.datalist.map(item => {
            return (
                {
                    key: item._id,
                    name: item.name,
                    age: item.age,
                    sex: item.sex,
                    feel: item.feel,
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