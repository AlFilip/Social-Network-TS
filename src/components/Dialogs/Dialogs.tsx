import React from 'react'
import s from "./Dialogs.module.css"
import Dialog from "./Dialog/Dialog"
import Message from "./Message/Message"
import { useDispatch, useSelector } from "react-redux"
import { AppStateType } from "../../redux/redux-store"
import { addMessage, dialogType, messageType, onMessageChange } from "../../redux/diaogsReducer"
import { redirectHOC } from "../Common/hoc/redirectHOC"
import { selectDialogs, selectMessages, selectNewMessageValue } from '../../redux/selectors'


const Dialogs = redirectHOC( () => {
    const dialogs = useSelector<AppStateType, dialogType[]>( selectDialogs )
    const messages = useSelector<AppStateType, messageType[]>( selectMessages )
    const newMessageValue = useSelector<AppStateType, string>( selectNewMessageValue )
    // const isAuth = useSelector<AppStateType, boolean>( selectIsAuth )
    const dispatch = useDispatch()

    const onButtonClickHandler = (): void => {
        dispatch( addMessage() )
    }
    const onNewMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        dispatch( onMessageChange( e.currentTarget.value ) )
    }

    const dialogsItems = dialogs.map( d => <Dialog name={ d.name } key={ d.id } id={ d.id }/> )
    const messagesItems = messages.map( m => <Message id={ m.id } key={ m.id } text={ m.text } owner={ m.owner }/> )


    return (

        <div className={ s.dialogs }>
            <div className={ s.dialogsItems }>
                <h3>Dialogs:</h3>
                { dialogsItems }
            </div>
            <div className={ s.messages }>
                { messagesItems }
            </div>
            <div className={ s.addMessageForm }>
                <textarea onChange={ onNewMessageChange } value={ newMessageValue }/>
                <button onClick={ onButtonClickHandler }>Send</button>
            </div>
        </div>
    )
} )

export default Dialogs