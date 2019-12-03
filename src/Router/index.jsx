import {Route, BrowserRouter as Router, Redirect, Switch} from 'react-router-dom'
import React from 'react'
import App from "../App";
import Home from "../Views/Home";
import Doctor from "../Views/Doctor";
import Medicinal from "../Views/Medicinal";
import Message from "../Views/Message";
import User from "../Views/User";
import Order from "../Views/Order";
import Comment from "../Views/Comment";
import Login from "../Views/Login";
import store from "../Redux/store";
import DoctorInsert from "../Views/DoctorInsert";


const isLogin = () => !!localStorage.getItem("name")
let permission;
store.subscribe(() => {
    console.log(store.getState().permission)
    permission = store.getState().permission
})
const router = (
    <Router>
        <App>
            <Switch>
                <Route path="/home" render={(props) => {
                    if (isLogin() && permission === 2) {
                        return (
                            <Home {...props}>
                                <Switch>
                                    <Route path="/home/doctor" component={Doctor}/>
                                    <Route path="/home/medicinal" component={Medicinal}/>
                                    <Route path="/home/message" component={Message}/>
                                    <Route path="/home/user" component={User}/>
                                    <Route path="/home/order" component={Order}/>
                                    <Route path="/home/comment" component={Comment}/>
                                    <Route path="/home/doctorinsert" component={DoctorInsert}/>
                                    <Redirect from="/home" to="/home/user"/>
                                </Switch>
                            </Home>
                        )
                    } else if (isLogin() && permission === 1) {
                        return (
                            <Home {...props}>
                                <Switch>
                                    <Route path="/home/comment" component={Comment}/>
                                    <Redirect from="/home" to="/home/comment"/>
                                </Switch>
                            </Home>
                        )
                    } else {
                        return <Redirect to="/login"/>
                    }
                    // return (
                    //     <Home {...props}>
                    //         <Switch>
                    //             <Route path="/home/doctor" component={Doctor}/>
                    //             <Route path="/home/medicinal" component={Medicinal}/>
                    //             <Route path="/home/message" component={Message}/>
                    //             <Route path="/home/user" component={User}/>
                    //             <Route path="/home/order" component={Order}/>
                    //             <Route path="/home/comment" component={Comment}/>
                    //             <Route path="/home/doctorinsert" component={DoctorInsert}/>
                    //             <Redirect from="/home" to="/home/user"/>
                    //         </Switch>
                    //     </Home>
                    // )

                }}/>
            <Route path="/login" component={Login}/>
            <Redirect from="/" to="/login"/>
        </Switch>
    </App>
</Router>
)


export default router