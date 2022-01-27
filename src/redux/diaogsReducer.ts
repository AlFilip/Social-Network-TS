import {dialogsApi, DomainDialogType, getMessagesResponseType, ReducedDomainMessageType} from "../api/dialogsApi";
import {ThunkType} from "./redux-store";
import {resultCodes} from "../api/usersApi";

export type DialogsStateType = typeof initState

const initState = {
    dialogs: [] as DomainDialogType[],
    messages: {
        error: null,
        totalCount: 0
    } as getMessagesResponseType,
}

const dialogsReducer = (state: DialogsStateType = initState, action: DialogsActionTypes): DialogsStateType => {
    switch (action.type) {
        case "SET_DIALOGS":
            return {
                ...state,
                dialogs: action.dialogs
            }
        case "CLEAR_STATE":
            return action.initState
        case "ADD_MESSAGE":
            return {
                ...state,
                messages: {
                    ...state.messages,
                    items: [...state.messages.items, action.message],
                    totalCount: state.messages.totalCount + 1
                }
            }
        case "SET_MESSAGES":
            return {
                ...state,
                messages: action.messages
            }
        default:
            return state
    }
}

export type DialogsActionTypes = SetDialogsActionType
    | SetLastDialogActionType
    | AddMessageActionType
    | SetMessagesActionType
    | ClearStateActionType

type SetDialogsActionType = ReturnType<typeof setDialogs>
type SetLastDialogActionType = ReturnType<typeof setCurrentDialog>
type AddMessageActionType = ReturnType<typeof addMessage>
type SetMessagesActionType = ReturnType<typeof setMessages>
type ClearStateActionType = ReturnType<typeof clearDialogsState>

export const setDialogs = (dialogs: DomainDialogType[]) => ({
    type: 'SET_DIALOGS', dialogs
} as const)

export const setCurrentDialog = (dialog: DomainDialogType) => ({
    type: 'SET_CURRENT_DIALOG', dialog
} as const)

export const setMessages = (messages: getMessagesResponseType) => ({
    type: 'SET_MESSAGES', messages
} as const)

export const addMessage = (message: ReducedDomainMessageType) => ({
    type: 'ADD_MESSAGE', message
} as const)

export const clearDialogsState = () => ({type: 'CLEAR_STATE', initState} as const)

export const getDialogs = (): ThunkType => async dispatch => {
    try {
        const {data, status} = await dialogsApi.getAllDialogs()
        if (status === 200 && data.length) {
            dispatch(setDialogs(data))
        }
    } catch (e) {
        console.log(e)
    }
}

export const getMessages = (userId: number): ThunkType => async dispatch => {
    try {
        const {data, status} = await dialogsApi.getMessages(userId)
        if (status === 200) {
            dispatch(setMessages(data))
        }
    } catch (e) {
        console.log(e)
    }

}

export const sendMessage = (userId: number, messageBody: string): ThunkType => async dispatch => {
    try {
        const {data: {data: {message}, resultCode}} = await dialogsApi.sendMessage(userId, messageBody)
        debugger
        if (resultCode === resultCodes.SUCCESS) {
            dispatch(addMessage(message))
        }
    } catch (e) {
        console.log(e)
    }
}

export const startChat = (userId: number): ThunkType => async dispatch => {
    try {
        const {status, data: {resultCode}} = await dialogsApi.startChat(userId)
        if (status === 200 && resultCode === resultCodes.SUCCESS) {
            dispatch(getDialogs())
        }
    } catch (e) {
        console.log(e)
    }
}

export default dialogsReducer