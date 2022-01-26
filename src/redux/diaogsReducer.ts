import {dialogsApi, DomainDialogType, getMessagesResponseType} from "../api/dialogsApi";
import {ThunkType} from "./redux-store";

export type DialogsStateType = typeof initState

export type DialogsType = Map<DomainDialogType, getMessagesResponseType>

const initState = {
    dialogs: new Map() as DialogsType,
    currentDialog: {} as DomainDialogType
}

const dialogsReducer = (state: DialogsStateType = initState, action: DialogsActionTypes): DialogsStateType => {
    switch (action.type) {
        case "SET_DIALOGS":
            return {
                ...state,
                dialogs: action.dialogs
            }
        case "SET_CURRENT_DIALOG":
            return {
                ...state,
                currentDialog: action.dialog
            }
        default:
            return state
    }
}

export type DialogsActionTypes = SetDialogsActionType
    | SetLastDialogActionType

type SetDialogsActionType = ReturnType<typeof setDialogs>
type SetLastDialogActionType = ReturnType<typeof setCurrentDialog>

export const setDialogs = (dialogs: DialogsType) => ({
    type: 'SET_DIALOGS', dialogs
} as const)

export const setCurrentDialog = (dialog: DomainDialogType) => ({
    type: 'SET_CURRENT_DIALOG', dialog
} as const)

export const getDialogs = (): ThunkType => async dispatch => {
    try {
        const {data, status} = await dialogsApi.getAllDialogs()
        if (status === 200 && data.length) {
            const dialogs: DialogsType = new Map()
            const messagesResponses = await Promise.all(data.map(dialog => {
                return dialogsApi.getMessages(dialog.id)
            }))
            data.forEach((dialog, index) => {
                dialogs.set(dialog, messagesResponses[index].data)
            })
            dispatch(setCurrentDialog(data[0]))
            dispatch(setDialogs(dialogs))
        }
    } catch (e) {
        console.log(e)
    }
}

export default dialogsReducer