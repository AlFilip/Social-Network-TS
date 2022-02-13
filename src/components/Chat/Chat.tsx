import React, {useCallback, useEffect, useState} from 'react'

import s from './Chat.module.scss'
import {ChatMessages} from './ChatMessages/ChatMessages'
import {ChatInput} from './ChatInput/ChatInput'


export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const Chat = () => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])
    const [ws, setWs] = useState<WebSocket | null>(null)
    const [interlocutor, setInterlocutor] = useState('')

    useEffect(() => {
        const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
        ws.onmessage = (message) => {
            setMessages(JSON.parse(message.data))
        }
        setWs(ws)
        return () => {
            ws.close()
        }
    }, [])

    const sendMessage = (message: string) => {
        if (ws && message) {
            ws.send(message)
        }
    }
    const setInterlocutorCallback = useCallback(setInterlocutor, [])
    return (
        <div className={s.chat}>
            <ChatMessages data={messages} setInterlocutor={setInterlocutorCallback}/>
            <div>
                <ChatInput callback={sendMessage} interlocutor={interlocutor}/>
            </div>
        </div>
    )
}

export default Chat