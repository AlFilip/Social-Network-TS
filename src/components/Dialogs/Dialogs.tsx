import React, {useEffect} from 'react'
import s from "./Dialogs.module.css"
import Dialog from "./Dialog/Dialog"
import {useDispatch} from "react-redux"
import {useAppSelector} from "../../redux/redux-store"
import {getDialogs, getMessages, startChat} from "../../redux/diaogsReducer"
import {redirectHOC} from "../Common/hoc/redirectHOC"
import {selectDialogs, selectMessages} from "../../redux/selectors";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import Message from "./Message/Message";
import {AddMessageForm} from "./AddMessageForm";

const Dialogs = redirectHOC(() => {
    const navigate = useNavigate()
    const {userId} = useParams()
    const dialogs = useAppSelector(selectDialogs)
    const currentDialog = dialogs[0]
    const messages = useAppSelector(selectMessages)
    const dispatch = useDispatch()
    const {pathname} = useLocation();

    useEffect(() => {
        if (!dialogs.length){
            dispatch(getDialogs())
        }
        // return () => {
        //     dispatch(clearDialogsState())
        // }
    }, [dispatch])

    useEffect(() => {
        if (userId) {
            dispatch(getMessages(+userId))
            if (currentDialog?.id !== +userId) {
                dispatch(startChat(+userId))
            }
        }
    }, [userId, currentDialog, dispatch])

    useEffect(() => {
        if (currentDialog && !userId) {
            navigate(`${currentDialog.id}`)
        }
    }, [currentDialog, userId, navigate])

    const DialogsArray = dialogs.map(dialog => {
        return <Dialog dialog={dialog} key={dialog.id} isActive={pathname.includes(dialog.id.toString())}/>
    })

    const Messages = messages.items && messages.items.map(message => {
        return <Message key={message.id} message={message}/>
    })

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <h3>Dialogs:</h3>
                {DialogsArray}
            </div>
            <div className={s.messages}>
                {Messages}
            </div>
            {
                currentDialog
                && <AddMessageForm userId={currentDialog.id}/>
            }
        </div>
    )
})

export default Dialogs