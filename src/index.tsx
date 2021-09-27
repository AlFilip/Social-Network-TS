import './index.css';
import reportWebVitals from './reportWebVitals';
import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
import {store} from "./redux/redux-store";
import {StateType} from "./redux/store";

const rerenderEntireTree = (state:StateType) => {
    ReactDOM.render(
        <React.StrictMode>
            <App {...state}
                 dispatch={store.dispatch.bind(store)}/>
        </React.StrictMode>,
        document.getElementById('root')
    )
}

store.subscribe(() => rerenderEntireTree(store.getState()))
rerenderEntireTree(store.getState())
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
