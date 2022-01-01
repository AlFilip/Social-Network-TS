import React, { useEffect, useState } from 'react'
import { ChatMessages } from './ChatMessages'
import { ChatInput } from './ChatInput'


export type chatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const Chat = () => {
    const [messages, setMessages] = useState<chatMessageType[]>( [] )
    const [ws, setWs] = useState<WebSocket | null>( null )

    useEffect( () => {
        const ws = new WebSocket( 'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx' )
        ws.onmessage = (message) => {
            setMessages( JSON.parse( message.data ) )
        }
        setWs( ws )
    }, [] )

    const sendMessage = (message: string) => {
        ws && message
        && ws.send( message )
    }
    return (
        <div>
            <ChatMessages data={ messages }/>
            <div>
                <ChatInput callback={ sendMessage }/>
            </div>
        </div>
    )
}

export default Chat