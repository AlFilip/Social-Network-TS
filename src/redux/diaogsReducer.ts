import {ActionTypes, AddMessageActionType, DialogsPageType, MessageType, OnMessageChangeActionType} from "./store";
import {v1} from "uuid";


export const ADD_MESSAGE = "ADD-MESSAGE";
export const ON_MESSAGE_CHANGE = "ON-MESSAGE-CHANGE";

export const AddMessageAC = (): AddMessageActionType => ({type: ADD_MESSAGE})
export const OnMessageChangeAC = (newValue: string): OnMessageChangeActionType => ({type: ON_MESSAGE_CHANGE, newValue})

export const dialogsReducer = (state: DialogsPageType, action: ActionTypes): DialogsPageType => {
    switch (action.type) {
        case ADD_MESSAGE:
            if (state.newMessageValue.trim()) {
                const newMessage: MessageType = {
                    id: v1(),
                    text: state.newMessageValue,
                    owner: true
                }
                state.messages.push(newMessage)
            }
            state.newMessageValue = ''
            return state
        case ON_MESSAGE_CHANGE:
            state.newMessageValue = action.newValue
            return state
        default:
            return state
    }

}