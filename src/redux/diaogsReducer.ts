import {ActionTypes, DialogsPageType, MessageType,} from "./store";
import {v1} from "uuid";


export const ADD_MESSAGE = "ADD-MESSAGE";
export const ON_MESSAGE_CHANGE = "ON-MESSAGE-CHANGE";


export type AddMessageAType = ReturnType<typeof AddMessageAC>
export type OnMessageChangeActionType = ReturnType<typeof OnMessageChangeAC>

export const AddMessageAC = () => ({type: ADD_MESSAGE} as const)
export const OnMessageChangeAC = (newValue: string) => ({type: ON_MESSAGE_CHANGE, newValue} as const)

const initState = {
    dialogs: [
        {name: "Sergey", id: 1},
        {name: "Artem", id: 2},
        {name: "Nikolay", id: 3},
    ],
    messages: [
        {id: v1(), text: 'Здорово, корова', owner: false},
        {id: v1(), text: 'Здорово, сама', owner: true},
    ],
    newMessageValue: '',
}

export const dialogs = (state: DialogsPageType = initState, action: ActionTypes): DialogsPageType => {
    debugger
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