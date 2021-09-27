import React from "react";
import {ActionTypes, DialogType, MessageType} from "../../redux/store";
import {AddMessageAC, OnMessageChangeAC} from "../../redux/diaogsReducer";
import Dialogs from "./Dialogs";


type DialogsContainerPropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageValue: string
    dispatch: (action: ActionTypes) => void
}

function DialogsContainer(props: DialogsContainerPropsType) {

    const onNewMessageChange = (text: string): void => {
        props.dispatch(OnMessageChangeAC(text))
    }
    const sendMessage = (): void => {
        props.dispatch(AddMessageAC())
    }

    return <Dialogs dialogs={props.dialogs}
                    messages={props.messages}
                    newMessageValue={props.newMessageValue}
                    onNewMessageChange={onNewMessageChange}
                    sendMessage={sendMessage}/>
}

export default DialogsContainer;