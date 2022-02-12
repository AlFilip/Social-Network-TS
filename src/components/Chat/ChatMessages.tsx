import React, {FC, memo, useEffect, useRef, useState} from 'react'
import {ChatMessageType} from './Chat'
import {ChatMessageItem} from './ChatMessageItem'

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
        <div style={{
            height: '50vh',
            width: '100%',
            overflowY: 'auto',
            border: '1px solid rgba(0,0,0,0.3)',
            borderRadius: 20,
        }} ref={messagesBlock}>
            {
                mappedMessages.length
                    ? mappedMessages
                    : 'no new messages'
            }
        </div>
    )
})