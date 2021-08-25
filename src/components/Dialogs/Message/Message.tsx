import React from "react";
import s from "./Message.module.css"

type MessageType = {
    text: string
    owner: boolean
}

function Message (props:MessageType) {
    return (
        <div className={`${props.owner ? s.userMessage: s.message}`}>
            {props.text}
        </div>
    )
}

export default Message;
