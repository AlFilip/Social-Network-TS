import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {AddMessageAC, dialogsStateType, OnMessageChangeAC} from "../../redux/diaogsReducer";
import {Dispatch} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {ActionTypes} from "../../redux/store";


type mapDispatchToPropsType = {
    onNewMessageChange: (text: string) => void
    sendMessage: () => void
}

export type DialogsPropsType = mapDispatchToPropsType & dialogsStateType


const mapStateToProps = (state: AppStateType): dialogsStateType => ({
    dialogs: state.dialogs.dialogs,
    messages: state.dialogs.messages,
    newMessageValue: state.dialogs.newMessageValue
})

const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>): mapDispatchToPropsType => ({
    onNewMessageChange: (text: string): void => {
        dispatch(OnMessageChangeAC(text))
    },
    sendMessage: (): void => {
        dispatch(AddMessageAC())
    }
})

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)