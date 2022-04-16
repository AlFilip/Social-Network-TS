import React, {FC, memo, useMemo} from 'react'
import {Link} from 'react-router-dom'

import s from './ChatMessageItem.module.scss'
import {ChatMessageType} from '../Chat'

type ChatMessageItemPropsType = ChatMessageType & { setInterlocutor: (value: string) => void }

export const ChatMessageItem: FC<ChatMessageItemPropsType> = memo(({
                                                                       userId,
                                                                       message,
                                                                       photo,
                                                                       userName,
                                                                       setInterlocutor,
                                                                   }) => {
    console.log('message')

    const firstName = useMemo(() => userName.split(' ')[0], [userName])


    const renderedName = useMemo(() => {
        const correctPhoto = photo ? photo : 'https://via.placeholder.com/50'
        const path = '/profile/' + userId
        const trimmedFirstName = firstName.length < 10 ? firstName : firstName.substring(0, 9)

        return (
            <div className={s.senderInfo}>
                <Link to={path}>
                    <img src={correctPhoto} alt="senderPhoto" className={s.senderPhoto}/>
                </Link>
                <span className={s.senderName}>
                    {trimmedFirstName}
                </span>
            </div>
        )
    }, [photo, userId, firstName])

    const renderedMessage = useMemo(() => {
        const messageClickHandle = () => {
            setInterlocutor(firstName)
        }
        return (
            <div className={s.messageBlock}>
                <div className={s.angle}/>
                <div className={s.message} onClick={messageClickHandle}>
                    {
                        message
                    }
                </div>
            </div>
        )
    }, [message, setInterlocutor, firstName])

    return (
        <div className={s.messageItem}>
            {renderedName}
            {renderedMessage}
        </div>
    )
})