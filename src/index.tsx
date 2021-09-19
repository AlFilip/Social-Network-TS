import './index.css';
import reportWebVitals from './reportWebVitals';
import store from "./redux/state";
import ReactDOM from "react-dom";
import React from "react";
import App from "./App";

const rerenderEntireTree = () => {
    ReactDOM.render(
        <React.StrictMode>
            <App {...store.getState()}
                 onNewMessageChange={store.onNewMessageChange.bind(store)}
                 addMessage={store.addMessage.bind(store)}
                 addPost={store.addPost.bind(store)}
                 onNewPostChange={store.onNewPostChange.bind(store)}/>
        </React.StrictMode>,
        document.getElementById('root')
    )
}

store._subscribe(rerenderEntireTree)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
