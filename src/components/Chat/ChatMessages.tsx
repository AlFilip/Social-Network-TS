import React, { FC, useEffect, useRef, useState } from 'react'
import { chatMessageType } from './Chat'
import { ChatMessageItem } from './ChatMessageItem'


export const ChatMessages: FC<{ data: chatMessageType[] }> = ({ data }) => {
    const [messages, setMessages] = useState<chatMessageType[]>( [] )

    const messagesBlock = useRef<HTMLDivElement>( null )

    useEffect( () => {
        setMessages( [...messages, ...data] )
        setTimeout( () => {
            messagesBlock.current
            && messagesBlock.current.scrollTo( 0, messagesBlock.current.scrollHeight )
        }, 0 )
        return () => {
        }
    }, [data] )

    const mappedMessages = messages.map( (m, index) => {
        return <ChatMessageItem key={ index } { ...m }/>
    } )


    return (
        <div style={ {
            height: '50vh',
            width: '100%',
            overflowY: 'auto',
            border: '1px solid rgba(0,0,0,0.3)',
            borderRadius: 20,
        } } ref={ messagesBlock }>
            {
                mappedMessages.length
                    ? mappedMessages
                    : 'no new messages'
            }
        </div>
    )
}