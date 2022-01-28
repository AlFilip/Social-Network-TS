import s from './ContextMenu.module.css'
import {MouseEventHandler} from "react";
import {useDispatch} from "react-redux";
import {deleteMessage, setAsASpam} from "../../../../redux/diaogsReducer";

type ContextMenuPropsType = {
    closeCallback?: () => void
    messageId: string
}

export const ContextMenu = ({
                                closeCallback,
                                messageId,
                            }: ContextMenuPropsType) => {
    const dispatch = useDispatch()
    const deleteClickHandle: MouseEventHandler<HTMLLIElement> = () => {
        dispatch(deleteMessage(messageId))
    }
    const spamClickHandle: MouseEventHandler<HTMLLIElement> = () => {
        dispatch(setAsASpam(messageId))
    }

    return (
        <div className={s.wrapper} onClick={closeCallback}>
            <div className={s.menu}>
                <ul className={s.actionsList}>
                    <li onClick={deleteClickHandle}>delete</li>
                    <li onClick={spamClickHandle}>set as spam</li>
                </ul>
            </div>
        </div>
    )
}