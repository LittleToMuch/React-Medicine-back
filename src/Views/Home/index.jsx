import React, {Component} from 'react'
import Headerler from "../../Components/Header";
import Tabbar from "../../Components/Tabbar";
import ContentList from "../../Components/ContentList";
export default class Home extends Component {
    render() {
        return (
            <div>
                <Headerler {...this.props}/>
                <Tabbar/>
                {this.props.children}
            </div>
        )
    }
}
