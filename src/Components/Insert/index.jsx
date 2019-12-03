import { Form, Input, Button, Checkbox } from 'antd';
import Upload from "../Upload";
import React from "react";
import Axios from "axios";
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
};
const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 },
};
class DynamicRule extends React.Component {
    state = {
        checkNick: false,
        name: '',
        department: '',
        tags: '',
        introduction: '',
        level: '',
        price: '',
        pic: ''
    };

    submit = () => {
        let {name, department, tags, introduction, level, price ,pic} = this.state
        Axios({
            url: '/api/doctor/create',
            method: 'post',
            data:{
                name,department,tags,introduction,level,price,pic
            }
        }).then(res => {
            console.log(res.data)
        })
    };

    handleChange = e => {
        this.setState(
            {
                checkNick: e.target.checked,
            },
            () => {
                this.props.form.validateFields(['nickname'], { force: true });
            },
        );
    };
    
    handleUpdate = (key, e) => {
        this.setState({
            [key]: e.target.value
        })
    }
    onAvatar = (path) => {
        this.setState({
            pic: path
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form.Item {...formItemLayout} label="姓名">
                    {getFieldDecorator('username', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your name',
                            },
                        ],
                    })(<Input placeholder="Please input your name" onChange={(e)=>{
                        this.handleUpdate('name', e)
                    }}/>)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="专业">
                    {getFieldDecorator('department', {
                        rules: [
                            {
                                required: this.state.checkNick,
                                message: 'Please input your nickname',
                            },
                        ],
                    })(<Input placeholder="Please input your nickname" onChange={(e)=>{
                        this.handleUpdate('department', e)
                    }}/>)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="标签">
                    {getFieldDecorator('tags', {
                        rules: [
                            {
                                required: this.state.checkNick,
                                message: 'Please input your nickname',
                            },
                        ],
                    })(<Input placeholder="Please input your nickname" onChange={(e)=>{
                        this.handleUpdate('tags', e)
                    }}/>)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="简介">
                    {getFieldDecorator('introduction', {
                        rules: [
                            {
                                required: this.state.checkNick,
                                message: 'Please input your nickname',
                            },
                        ],
                    })(<Input placeholder="Please input your nickname" onChange={(e)=>{
                        this.handleUpdate('introduction', e)
                    }}/>)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="职称">
                    {getFieldDecorator('level', {
                        rules: [
                            {
                                required: this.state.checkNick,
                                message: 'Please input your nickname',
                            },
                        ],
                    })(<Input placeholder="Please input your nickname" onChange={(e)=>{
                        this.handleUpdate('level', e)
                    }}/>)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="挂号价格">
                    {getFieldDecorator('price', {
                        rules: [
                            {
                                required: this.state.checkNick,
                                message: 'Please input your nickname',
                            },
                        ],
                    })(<Input placeholder="Please input your nickname" onChange={(e)=>{
                        this.handleUpdate('price', e)
                    }}/>)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="医师图片">
                    <Upload onAvatar={this.onAvatar}/>
                </Form.Item>


                <Form.Item {...formTailLayout}>
                    <Button type="primary" onClick={this.submit} >
                        Check
                    </Button>
                </Form.Item>
            </div>
        );
    }
}
export default Form.create({ name: 'dynamic_rule' })(DynamicRule)