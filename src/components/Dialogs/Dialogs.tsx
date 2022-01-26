import React, {useEffect} from 'react'
import s from "./Dialogs.module.css"
import Dialog from "./Dialog/Dialog"
import {useDispatch} from "react-redux"
import {useAppSelector} from "../../redux/redux-store"
import {DialogsType, getDialogs, setCurrentDialog, setDialogs} from "../../redux/diaogsReducer"
import {redirectHOC} from "../Common/hoc/redirectHOC"
import {selectCurrentDialog, selectDialogs} from "../../redux/selectors";
import {useNavigate, useParams} from "react-router-dom";
import {DomainDialogType, getMessagesResponseType} from "../../api/dialogsApi";
import Message from "./Message/Message";

const Dialogs = redirectHOC(() => {
    const dialogs = useAppSelector(selectDialogs)
    const dispatch = useDispatch()
    const currentDialog = useAppSelector(selectCurrentDialog)
    const onButtonClickHandler = (): void => {
    }
    const onNewMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    }


    const dialogClickHandle = (dialog: DomainDialogType) => {
        dispatch(setCurrentDialog(dialog))

    }

    const DialogsArray = Array.from(dialogs, (([dialog]) => {
        return <Dialog key={dialog.id} dialog={dialog} callback={dialogClickHandle}/>
    }))


    const messages: getMessagesResponseType | undefined | false = currentDialog && !!dialogs.size && dialogs.get(currentDialog)

    const Messages = messages && messages.items.map(message => {
        return <Message key={message.id} message={message}/>
    })

    const navigate = useNavigate()
    const {userId} = useParams()

    useEffect(() => {
        dispatch(getDialogs())
        return () => {
            dispatch(setDialogs(new Set() as unknown as DialogsType))
        }
    }, [dispatch])

    useEffect(() => {
        if (currentDialog && currentDialog.id && !userId) {
            navigate(`${currentDialog.id}`)
        }
    }, [currentDialog, userId, navigate])

    return (

        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <h3>Dialogs:</h3>
                {DialogsArray}
            </div>
            <div className={s.messages}>
                {Messages}
            </div>
            <div className={s.addMessageForm}>
                <textarea onChange={onNewMessageChange} value={'newMessageValue'}/>
                <button onClick={onButtonClickHandler}>Send</button>
            </div>
        </div>
    )
})

export default Dialogs