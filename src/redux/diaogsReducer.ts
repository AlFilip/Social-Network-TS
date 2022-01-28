import {dialogsApi, DomainDialogType, getMessagesResponseType, ReducedDomainMessageType} from "../api/dialogsApi";
import {ThunkType} from "./redux-store";
import {resultCodes} from "../api/usersApi";

const initState = {
    dialogs: [] as DomainDialogType[],
    messages: {
        items: [],
        error: null,
        totalCount: 0,
    } as MessagesStateType,
}

const dialogsReducer = (state: DialogsStateType = initState, action: DialogsActionTypes): DialogsStateType => {
    switch (action.type) {
        case "SET_DIALOGS":
            return {
                ...state,
                dialogs: action.dialogs
            }

        case "SET_MESSAGES":
            return {
                ...state,
                messages: {
                    ...action.messages,
                    items: action.messages.items.map(message => ({...message, deleted: false}))
                }
            }

        case "CLEAR_STATE":
            return action.initState

        case "ADD_MESSAGE":
            return {
                ...state,
                messages: {
                    ...state.messages,
                    items: [...state.messages.items, {...action.message, deleted: false}],
                    totalCount: state.messages.totalCount + 1
                }
            }

        case "SET_MESSAGE_VIEWED":
            const message = state.messages.items.find(f => f.id === action.messageId)
            return message?.viewed === action.viewed
                ? state
                : {
                    ...state,
                    messages: {
                        ...state.messages,
                        items: state.messages.items
                            .map(message => message.id === action.messageId ? ({
                                ...message,
                                viewed: action.viewed
                            }) : message)
                    }
                }

        case "MARK_MESSAGE_AS_DELETED":
            return {
                ...state,
                messages: {
                    ...state.messages,
                    items: state.messages.items
                        .map(message => message.id === action.messageId ? {...message, deleted: true} : message)
                }
            }

        case "MARK_MESSAGE_AS_NOT_DELETED":
            return {
                ...state,
                messages: {
                    ...state.messages,
                    items: state.messages.items
                        .map(message => message.id === action.messageId ? {...message, deleted: false} : message)
                }
            }

        default:
            return state
    }
}

// actions

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

export const setMessageViewed = (messageId: string, viewed: boolean) => ({
    type: 'SET_MESSAGE_VIEWED', messageId, viewed
} as const)

export const clearDialogsState = () => ({type: 'CLEAR_STATE', initState} as const)

export const markMessageAsDeleted = (messageId: string) => ({
    type: 'MARK_MESSAGE_AS_DELETED', messageId
} as const)

export const markMessageAsNotDeleted = (messageId: string) => ({
    type: 'MARK_MESSAGE_AS_NOT_DELETED', messageId
} as const)


// thunks

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

export const checkMessageViewed = (messageId: string): ThunkType => async dispatch => {
    try {
        const {data, status} = await dialogsApi.checkMessageViewed(messageId)
        if (status === 200) {
            dispatch(setMessageViewed(messageId, data))
        }
    } catch (e) {
        console.log(e)
    }
}

export const setAsASpam = (messageId: string): ThunkType => async () => {
    try {
        const {data: {resultCode}, status} = await dialogsApi.sendMessageToSpam(messageId)
        if (status === 200 && resultCode === resultCodes.SUCCESS) {
            console.log(`message with id: "${messageId}" successfully sent to spam`)
        }
    } catch (e) {
        console.log(e)
    }
}

export const deleteMessage = (messageId: string): ThunkType => async dispatch => {
    try {
        const {data: {resultCode}, status} = await dialogsApi.deleteMessage(messageId)
        if (status === 200 && resultCode === resultCodes.SUCCESS) {
            dispatch(markMessageAsDeleted(messageId))
        }
    } catch (e) {
        console.log(e)
    }
}

export const restoreMessage = (messageId: string): ThunkType => async dispatch => {
    try {
        const {data: {resultCode}, status} = await dialogsApi.restoreMessage(messageId)
        if (status === 200 && resultCode === resultCodes.SUCCESS) {
            dispatch(markMessageAsNotDeleted(messageId))
        }
    } catch (e) {
        console.log(e)
    }
}


// types

export type DialogsActionTypes = SetDialogsActionType
    | SetLastDialogActionType
    | AddMessageActionType
    | SetMessagesActionType
    | ClearStateActionType
    | SetMessageViewedActionType
    | MarkMessageAsDeletedActionType
    | MarkMessageAsNtoDeletedActionType

type SetDialogsActionType = ReturnType<typeof setDialogs>
type SetLastDialogActionType = ReturnType<typeof setCurrentDialog>
type AddMessageActionType = ReturnType<typeof addMessage>
type SetMessagesActionType = ReturnType<typeof setMessages>
type ClearStateActionType = ReturnType<typeof clearDialogsState>
type SetMessageViewedActionType = ReturnType<typeof setMessageViewed>
type MarkMessageAsDeletedActionType = ReturnType<typeof markMessageAsDeleted>
type MarkMessageAsNtoDeletedActionType = ReturnType<typeof markMessageAsNotDeleted>


export type DialogsStateType = typeof initState

export type MessageType = ReducedDomainMessageType & {
    deleted: boolean
}

type MessagesStateType = {
    items: MessageType[]
    error: null | string
    totalCount: number
}


export default dialogsReducer