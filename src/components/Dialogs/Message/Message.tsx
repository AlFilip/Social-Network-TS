import React from "react";
import s from "./Message.module.css"
import {reducedDomainMessageType} from "../../../api/dialogsApi";
import {useAppSelector} from "../../../redux/redux-store";
import {selectAuthorisedUserId} from "../../../redux/selectors";


type MessagePropsType = {
    message: reducedDomainMessageType
}

function Message({
                     message
                 }: MessagePropsType) {

    const authorisedUserId = useAppSelector(selectAuthorisedUserId)

    return (
        <div className={`${message.senderId === authorisedUserId ? s.userMessage : s.message}`}>
            {message.body}
        </div>
    )
}

export default Message;
