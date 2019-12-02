import React, {Component} from 'react'
import style from "./index.module.scss";
import {Layout} from "antd";
const {Header} = Layout;
export default class Headerler extends Component {
    state = {
        name: ''
    }
    componentDidMount() {
        console.log(this.props)
        this.setState({
            name: localStorage.getItem("name")
        })
    }
    exitHandle = (e) => {
        e.preventDefault();
        localStorage.removeItem("name")
        this.props.history.push("/login")
    }
    render() {
        return (
            <div>
                <Header className={style.header}>
                    <h1>中医中药管理系统</h1>
                    <a onClick={this.exitHandle}>退出系统</a>
                    <h2 id="name">{this.state.name}</h2>
                    <img src=""></img>
                </Header>
            </div>
        )
    }
}