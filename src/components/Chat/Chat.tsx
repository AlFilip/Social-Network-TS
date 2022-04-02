import {memo, useCallback, useEffect, useState} from 'react'

import s from './Chat.module.scss'
import {ChatMessages} from './ChatMessages/ChatMessages'
import {ChatInput} from './ChatInput/ChatInput'
import {SubHeader} from "../Common/SubHeader/SubHeader";


export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const Chat = memo(() => {
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

    const sendMessage = useCallback((message: string) => {
        if (ws && message) {
            ws.send(message)
        }
    },[ws])
    const setInterlocutorCallback = useCallback(setInterlocutor, [])
    return (
        <div className={s.chat}>
            <SubHeader title='Rocket Chat' className={s.header}/>
            <ChatMessages data={messages} setInterlocutor={setInterlocutorCallback}/>
            <ChatInput callback={sendMessage} interlocutor={interlocutor}/>
        </div>
    )
})

export default Chat