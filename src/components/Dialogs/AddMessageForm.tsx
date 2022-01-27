import s from "./Dialogs.module.css";
import React, {ChangeEventHandler, useState} from "react";
import {useDispatch} from "react-redux";
import {sendMessage} from "../../redux/diaogsReducer";

type AddMessageFormPropsType = {
    userId: number
}

export const AddMessageForm = ({
                                   userId
                               }: AddMessageFormPropsType) => {
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    const changeHandle: ChangeEventHandler<HTMLTextAreaElement> = e => {
        setMessage(e.currentTarget.value)
    }

    const buttonClickHandle = () => {
        dispatch(sendMessage(userId, message))
        setMessage('')
    }

    return (
        <div className={s.addMessageForm}>
            <textarea onChange={changeHandle} value={message}/>
            <button onClick={buttonClickHandle}>Send</button>
        </div>
    )
}