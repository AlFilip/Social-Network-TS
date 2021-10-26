import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {addMessage, dialogsStateType, onMessageChange} from "../../redux/diaogsReducer";
import {AppStateType} from "../../redux/redux-store";


type mapDispatchToPropsType = {
    onMessageChange: (text: string) => void
    addMessage: () => void
}

export type DialogsPropsType = mapDispatchToPropsType & dialogsStateType


const mapStateToProps = (state: AppStateType): dialogsStateType => ({
    dialogs: state.dialogs.dialogs,
    messages: state.dialogs.messages,
    newMessageValue: state.dialogs.newMessageValue
})


export const DialogsContainer = connect(mapStateToProps, {onMessageChange, addMessage})(Dialogs)