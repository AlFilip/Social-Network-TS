import React, {MouseEventHandler, useEffect, useState} from "react";
import s from "./Message.module.css"
import {useAppSelector} from "../../../redux/redux-store";
import {selectAuthorisedUserId} from "../../../redux/selectors";
import {ContextMenu} from "./ContextMenu/ContextMenu";
import {MessageType, restoreMessage} from "../../../redux/diaogsReducer";
import {useDispatch} from "react-redux";


type MessagePropsType = {
    message: MessageType
}

function Message({
                     message,
                 }: MessagePropsType) {
    const [isMenuActive, setMenuActivity] = useState(false)
    const [auxClickCoords, setAuxClickCoords] = useState({pageX: 0, pageY: 0})
    const dispatch = useDispatch()

    const authorisedUserId = useAppSelector(selectAuthorisedUserId)

    const auxClickHandle: MouseEventHandler<HTMLDivElement> = e => {
        e.preventDefault()
        setAuxClickCoords({pageX: e.pageX, pageY: e.pageY})
        setMenuActivity(true)
    }

    useEffect(() => {
        setMenuActivity(false)
    }, [message])

    const restoreHandle = () => {
        dispatch(restoreMessage(message.id))
    }

    const messageClassName = `${message.senderId === authorisedUserId ? s.userMessage : s.message}`


    return (
        <>
            {
                message.deleted
                    ? <div>
                        <span className={s.deleted}>message deleted...</span>
                        <span className={s.restore} onClick={restoreHandle}> restore</span>
                    </div>

                    : <div className={messageClassName}
                           onAuxClick={auxClickHandle}
                           onContextMenu={e => e.preventDefault()}
                    >
                        {
                            message.body
                        }
                        {
                            isMenuActive
                            && <ContextMenu messageId={message.id}
                                            closeCallback={() => setMenuActivity(false)}
                                            auxClickCoords={auxClickCoords}
                            />
                        }
                    </div>
            }</>
    )
}

export default Message;
