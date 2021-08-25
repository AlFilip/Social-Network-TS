import React from "react";
import s from "./Dialogs.module.css"
import Message from "./Message/Message";
import Dialog from "./Dialog/Dialog";


function Dialogs() {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <h3>Dialogs:</h3>
                <Dialog name={'Sergey'} id={1}/>
                <Dialog name={'Artem'} id={2}/>
            </div>
            <div className={s.messages}>
                <Message text={'Здорово, корова'} owner={false}/>
                <Message text={'Здорово, сама'} owner={true}/>
            </div>

        </div>
    )
}

export default Dialogs;