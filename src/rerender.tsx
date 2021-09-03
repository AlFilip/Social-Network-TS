import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
import {addMessage, onNewMessageChange, StateType} from "./redux/state";

const rerenderEntireTree = (state:StateType) => {
    ReactDOM.render(
        <React.StrictMode>
            <App {...state} onNewMessageChange={onNewMessageChange} addMessage={addMessage}/>
        </React.StrictMode>,
        document.getElementById('root')
    )
}

export default rerenderEntireTree