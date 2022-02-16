import s from "./Dialogs.module.css";
import React, {ChangeEventHandler, useState} from "react";
import {useDispatch} from "react-redux";
import {sendMessage, startChat} from "../../redux/diaogsReducer";
import {useAppSelector} from "../../redux/redux-store";
import {selectDialogs} from "../../redux/selectors";
import {useParams} from "react-router-dom";

export const AddMessageForm = () => {
    const [message, setMessage] = useState('')
    const dialogs = useAppSelector(selectDialogs)
    const {userId} = useParams<{ userId: string }>()
    const currentDialog = dialogs[0]
    const dispatch = useDispatch()
    const changeHandle: ChangeEventHandler<HTMLTextAreaElement> = e => {
        const newMessage = e.currentTarget.value
        if (newMessage.length <= 1000) {
            setMessage(newMessage)
        }
        if (userId && +userId !== currentDialog?.id) {
            dispatch(startChat(+userId))
        }
    }

    const buttonClickHandle = () => {
        if(userId) {
            dispatch(sendMessage(+userId, message))
        }
        setMessage('')
    }

    return (
        <div className={s.addMessageForm}>
            <textarea onChange={changeHandle} value={message}/>
            <button onClick={buttonClickHandle}>Send</button>
        </div>
    )
}