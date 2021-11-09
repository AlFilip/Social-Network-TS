import React from "react";
import s from "./Dialogs.module.css"
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {addMessage, dialogType, messageType, onMessageChange} from "../../redux/diaogsReducer";
import { Redirect } from "react-router-dom";
import {redirectHOC} from "../Common/redirectHOC/redirectHOC";

const Dialogs =  redirectHOC(() => {
    const dialogs = useSelector<AppStateType, dialogType[]>(state => state.dialogs.dialogs)
    const messages = useSelector<AppStateType, messageType[]>(state => state.dialogs.messages)
    const newMessageValue = useSelector<AppStateType, string>(state => state.dialogs.newMessageValue)
    const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)
    const dispatch = useDispatch()

    const onButtonClickHandler = (): void => {
        dispatch(addMessage())
    }
    const onNewMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        dispatch(onMessageChange(e.currentTarget.value))
    }

    const dialogsItems = dialogs.map(d => <Dialog name={d.name} key={d.id} id={d.id}/>)
    const messagesItems = messages.map(m => <Message id={m.id} key={m.id} text={m.text} owner={m.owner}/>)


    return (

        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <h3>Dialogs:</h3>
                {dialogsItems}
            </div>
            <div className={s.messages}>
                {messagesItems}
            </div>
            <div className={s.addMessageForm}>
                <textarea onChange={onNewMessageChange} value={newMessageValue}/>
                <button onClick={onButtonClickHandler}>Send</button>
            </div>
        </div>
    )
})

export default Dialogs;