import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css'
// import App from './App';
import route from './Router'
import * as serviceWorker from './serviceWorker';
document.querySelector('#root').style.height=document.documentElement.clientHeight+'px'
ReactDOM.render(route, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
