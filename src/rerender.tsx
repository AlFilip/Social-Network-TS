import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
import {addMessage, addPost, onNewMessageChange, onNewPostChange, StateType} from "./redux/state";

const rerenderEntireTree = (state: StateType) => {
    ReactDOM.render(
        <React.StrictMode>
            <App {...state}
                 onNewMessageChange={onNewMessageChange}
                 addMessage={addMessage}
                 addPost={addPost}
                 onNewPostChange={onNewPostChange}/>
        </React.StrictMode>,
        document.getElementById('root')
    )
}

export default rerenderEntireTree