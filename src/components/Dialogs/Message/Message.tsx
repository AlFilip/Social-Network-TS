import React from "react";
import s from "./Message.module.css"
import {messageType} from "../../../redux/diaogsReducer";


function Message (props:messageType) {
    return (
        <div className={`${props.owner ? s.userMessage: s.message}`}>
            {props.text}
        </div>
    )
}

export default Message;
