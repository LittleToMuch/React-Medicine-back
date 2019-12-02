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

const isLogin = () => !!localStorage.getItem("name")
const router = (
    <Router>
        <App>
            <Switch>
                <Route path="/home" render={(props) => {
                    return (
                        isLogin() ?
                        <Home {...props}>
                            <Switch>
                                <Route path="/home/doctor" component={Doctor}/>
                                <Route path="/home/medicinal" component={Medicinal}/>
                                <Route path="/home/message" component={Message}/>
                                <Route path="/home/user" component={User}/>
                                <Route path="/home/order" component={Order}/>
                                <Route path="/home/comment" component={Comment}/>
                                <Redirect from="/home" to="/home/user"/>
                            </Switch>
                        </Home> : <Redirect to="/login"/>
                    )
                }}/>
                <Route path="/login" component={Login}/>
                <Redirect from="/" to="/login"/>
            </Switch>
        </App>
    </Router>
)

export default router