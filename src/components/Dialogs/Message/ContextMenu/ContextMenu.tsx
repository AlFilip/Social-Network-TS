import s from './ContextMenu.module.scss'
import {MouseEventHandler} from "react";
import {useDispatch} from "react-redux";
import {deleteMessage, setAsASpam} from "../../../../redux/diaogsReducer";

type ContextMenuPropsType = {
    closeCallback?: () => void
    messageId: string
    auxClickCoords: {
        pageX: number
        pageY: number
    }
}

export const ContextMenu = ({
                                closeCallback,
                                messageId,
                                auxClickCoords,
                            }: ContextMenuPropsType) => {
    const dispatch = useDispatch()
    const deleteClickHandle: MouseEventHandler<HTMLLIElement> = () => {
        dispatch(deleteMessage(messageId))
    }
    const spamClickHandle: MouseEventHandler<HTMLLIElement> = () => {
        dispatch(setAsASpam(messageId))
    }
    const menuStyle = {
        left: auxClickCoords.pageX - 60,
        top: auxClickCoords.pageY,
    }

    return (
        <div className={s.wrapper} onClick={closeCallback}>
            <div className={s.menu} style={menuStyle}>
                <ul className={s.actionsList}>
                    <li onClick={deleteClickHandle}>delete</li>
                    <li onClick={spamClickHandle}>set as spam</li>
                </ul>
            </div>
        </div>
    )
}