import React, {Component} from 'react'
// age: "30"
// chest: "1"
// doctorId: 11
// feel: "浑身发热"
// habit: "啥都爱吃"
// history: "浑身瘫痪，半身不遂"
// hurt: "大腿"
// name: "kerwin"
// path: "/images/question/1a75cda4a6a83a1fbc4f9c4cb5ebf56b"
// perspire: "一到晚上浑身发热出汗"
// sex: "男"
// shit: "还ok"
// smoke: (2) ["饮酒", "吸烟"]
// userId: "5dcf522854519282a15be1fa"
// __v: 0
// _id: "5dcf8a23233fd394f5dbe38e"
export default class Details extends Component {

    render() {
        console.log(this.props)
        return (
            <div>
                <p>姓名：{this.props.name}</p>
                <p>年龄：{this.props.age}</p>
                <p>性别：{this.props.sex}</p>
                <p>冷热情况：{this.props.feel}</p>
                <p>饮食情况：{this.props.habit}</p>
                <p>病史：{this.props.history}</p>
                <p>出汗情况：{this.props.perspire}</p>
                <p>大小便情况：{this.props.shit}</p>
                <p>图片：<img src={'http://114.215.136.99'+this.props.path} alt={this.props.name}/></p>
                <p>抽烟饮酒情况：{this.props.smoke.map((item, index) => (<span key={index}>{item} </span>))}</p>
            </div>
        )
    }
}