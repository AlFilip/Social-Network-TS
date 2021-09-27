import React from "react";
import {ActionTypes, DialogType, MessageType} from "../../redux/store";
import {AddMessageAC, OnMessageChangeAC} from "../../redux/diaogsReducer";
import Dialogs from "./Dialogs";
import {MyContext} from "../../storeContext";


type DialogsContainerPropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageValue: string
    dispatch: (action: ActionTypes) => void
}

function DialogsContainer(props: DialogsContainerPropsType) {
    return (
        <MyContext.Consumer>
            {
                (store) => {
                    const onNewMessageChange = (text: string): void => {
                        store.dispatch(OnMessageChangeAC(text))
                    }
                    const sendMessage = (): void => {
                        store.dispatch(AddMessageAC())
                    }
                    const dialogsData = store.getState().dialogs
                    return <Dialogs dialogs={dialogsData.dialogs}
                                    messages={dialogsData.messages}
                                    newMessageValue={dialogsData.newMessageValue}
                                    onNewMessageChange={onNewMessageChange}
                                    sendMessage={sendMessage}/>
                }
            }
        </MyContext.Consumer>
    )
}

export default DialogsContainer;