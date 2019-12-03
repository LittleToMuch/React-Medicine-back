import React, {Component} from 'react'
import style from './index.module.scss'
import ContentList2 from "../../Components/ContentList2"
export default class DoctorInsert extends Component {
    render() {
        return (
            <div className={style.content}>
                <ContentList2/>
            </div>
        )
    }
}