import React, {FC, memo} from 'react'
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
    photo = photo ? photo : 'https://via.placeholder.com/50'
    console.log('message')

    const firstName = userName.split(' ')[0]

    const messageClickHandle = () => {
        setInterlocutor(firstName)
    }

    return (
        <div className={s.messageItem}>
            <div className={s.senderInfo}>
                <Link to={'/profile/' + userId}>
                    <img src={photo} alt="senderPhoto" className={s.senderPhoto}/>
                </Link>
                <span className={s.senderName}>
                    {
                        firstName.length < 10 ? firstName : firstName.substring(0, 9)
                    }
                </span>
            </div>

            <div className={s.messageBlock}>
                <div className={s.angle}/>
                <div className={s.message} onClick={messageClickHandle}>
                    {
                        message
                    }
                </div>
            </div>
        </div>
    )
})