import {createStore, compose, combineReducers} from "redux";
import permissionReducer from "./reducer/permissionReducer";

const reducer = combineReducers({
    permission: permissionReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers())