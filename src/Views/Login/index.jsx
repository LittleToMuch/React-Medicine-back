import React, {Component} from 'react'
import "./index.scss";
import {Form, Icon, Input, Button, Checkbox, notification} from 'antd';
import Axios from "axios";

class Login extends Component {
    state = {
        username: '',
        password: ''
    };
    username = React.createRef();
    password = React.createRef();
    loginHandle = () => {
        console.log(this.username.current.input.value)
        let [tel, password] = [this.username.current.input.value, this.password.current.input.value]
        Axios({
            url: '/bpi/login/login',
            method: 'post',
            data:{
                tel,password
            }
        }).then(res => {
            let {login} = res.data
            if (login === 1) {
                notification.open({
                    message: 'tips',
                    description:
                        `欢迎您，${res.data.result[0].username}`,
                    icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
                });
                localStorage.setItem("name",res.data.result[0].username)
                this.props.history.push("/home")
            } else {
                notification.open({
                    message: 'tips',
                    description:
                        '账号或密码错误',
                    icon: <Icon type="bad" style={{ color: '#108ee9' }} />,
                });
            }
        })
    };
    

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div id="body">
                <div id="medicine">
                    <h1>中医中药管理系统</h1>

                    <Form className="login-form">
                        <Form.Item>
                            {getFieldDecorator("username", {
                                rules: [
                                    {required: true, message: "Please input your username!"}
                                ]
                            })(
                                <Input
                                    prefix={
                                        <Icon
                                            type="user"
                                            style={{color: "rgba(0,0,0,.25)"}}
                                        />
                                    }
                                    placeholder="Username"
                                    ref={this.username}
                                />
                            )}
                        </Form.Item>

                        <Form.Item>
                            {getFieldDecorator("password", {
                                rules: [
                                    {required: true, message: "Please input your Password!"}
                                ]
                            })(
                                <Input
                                    prefix={
                                        <Icon
                                            type="lock"
                                            style={{color: "rgba(0,0,0,.25)"}}
                                        />
                                    }
                                    type="password"
                                    placeholder="Password"
                                    ref={this.password}
                                />
                            )}
                        </Form.Item>

                        <Form.Item>
                            {getFieldDecorator("remember", {
                                valuePropName: "checked",
                                initialValue: false
                            })(<Checkbox>Remember me</Checkbox>)}
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                onClick={this.loginHandle}
                            >
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Form.create({name: "normal_login"})(Login);
