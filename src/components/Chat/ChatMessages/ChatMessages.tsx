import React, {FC, memo, useEffect, useRef, useState} from 'react'

import s from './ChatMessages.module.scss'
import {ChatMessageType} from '../Chat'
import {ChatMessageItem} from '../ChatMessageItem/ChatMessageItem'

type ChatMessagesPropsType = {
    data: ChatMessageType[]
    setInterlocutor: (value: string) => void
}


export const ChatMessages: FC<ChatMessagesPropsType> = memo(({
                                                                 data,
                                                                 setInterlocutor,
                                                             }) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    const messagesBlock = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setMessages([...messages, ...data])
        setTimeout(() => {
            messagesBlock.current
            && messagesBlock.current.scrollTo(0, messagesBlock.current.scrollHeight)
        }, 0)
    }, [data])

    const mappedMessages = messages.map((m, index) => (
        <ChatMessageItem key={index}
                         {...m}
                         setInterlocutor={setInterlocutor}
        />)
    )


    return (
        <div className={s.messages}
             ref={messagesBlock}
        >

            {
                mappedMessages.length
                    ? mappedMessages
                    : 'no new messages'
            }
        </div>
    )
})