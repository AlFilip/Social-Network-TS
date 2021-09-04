import React from "react";
import s from "./Dialogs.module.css"
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";
import {DialogType, MessageType} from "../../redux/state";


type DialogsPagePropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    addMessage: (postMessage: string) => void
    newMessageValue: string
    onNewMessageChange: (newValue: string) => void
}

function Dialogs(props: DialogsPagePropsType) {

    const dialogsItems = props.dialogs.map(d => <Dialog name={d.name} id={d.id}/>)

    const messagesItems = props.messages.map(m => <Message id={m.id} text={m.text} owner={m.owner}/>)

    const textAreaRef = React.createRef<HTMLTextAreaElement>()

    const sendMessage = (): void => {
        if (textAreaRef.current && textAreaRef.current.value.trim()) {
            props.addMessage(textAreaRef.current.value)
        }
    }

    const onNewMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        props.onNewMessageChange(e.currentTarget.value)
    }

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
                <textarea ref={textAreaRef} onChange={onNewMessageChange} value={props.newMessageValue} name="" id=""/>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default Dialogs;