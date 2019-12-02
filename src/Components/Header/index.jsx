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
                    <img src="https://ss0.bdstatic.com/6Ox1bjeh1BF3odCf/it/u=733717429,363003047&fm=74&app=80&f=JPEG&size=f121,140?sec=1880279984&t=e781cf317a6ac72636fe1430c476d8aa"></img>
                </Header>
            </div>
        )
    }
}