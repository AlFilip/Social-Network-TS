import {FC, useEffect, useMemo, useRef, useState} from 'react'

import s from './ChatMessages.module.scss'
import {ChatMessageType} from '../Chat'
import {ChatMessageItem} from '../ChatMessageItem/ChatMessageItem'

type ChatMessagesPropsType = {
    data: ChatMessageType[]
    setInterlocutor: (value: string) => void
}

export const ChatMessages: FC<ChatMessagesPropsType> = ({
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

    const renderedMessages = useMemo(() => {
        if (!messages) return 'no new messages'

        return messages.map((m, index) => {
                return <ChatMessageItem key={index + m.message}
                                        {...m}
                                        setInterlocutor={setInterlocutor}
                />
            }
        )
    }, [messages])

    return (
        <div className={s.messages} ref={messagesBlock}>
            {renderedMessages}
        </div>
    )
}