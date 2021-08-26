import React from "react";
import s from "./Dialogs.module.css"
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";
import { DialogsPageType } from "../../redux/state";


function Dialogs(props:DialogsPageType) {

    const dialogsItems = props.dialogs.map(d => <Dialog name={d.name} id={d.id}/>)


    const messagesItems = props.messages.map(m => <Message id={m.id} text={m.text} owner={m.owner}/>)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <h3>Dialogs:</h3>
                {dialogsItems}
            </div>
            <div className={s.messages}>
                {messagesItems}
            </div>

        </div>
    )
}

export default Dialogs;