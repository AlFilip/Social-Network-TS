import './index.css';
import reportWebVitals from './reportWebVitals';
import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
import {AppStateType, store} from "./redux/redux-store";
import {Provider} from "react-redux";


const rerenderEntireTree = (state: AppStateType) => {
    ReactDOM.render(
        <React.StrictMode>
            <Provider store={store}>
                <App {...state}
                     dispatch={store.dispatch.bind(store)}/>
            </Provider>
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

