import React, { ChangeEvent, FC, KeyboardEventHandler, MouseEventHandler, useEffect, useRef, useState } from 'react'


type messageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

export const Chat = () => {
    const [messages, setMessages] = useState<messageType[]>( [] )
    const [ws, setWs] = useState<WebSocket | null>( null )

    useEffect( () => {
        const ws = new WebSocket( 'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx' )
        ws.onmessage = (message) => {
            setMessages( JSON.parse( message.data ) )
        }
        setWs( ws )
    }, [] )

    const sendMessage = (message: string) => {
        ws
        && message
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


const ChatMessages: FC<{ data: messageType[] }> = ({ data }) => {
    const [messages, setMessages] = useState<messageType[]>( [] )

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
            width: 400,
            overflowY: 'auto',
            border: '1px solid rgba(0,0,0,0.3)',
            borderRadius: 20,
            padding: 10,
        } } ref={ messagesBlock }>
            {
                mappedMessages.length
                    ? mappedMessages
                    : 'no new messages'
            }
        </div>
    )
}


const ChatMessageItem: FC<messageType> = ({ userId, message, photo, userName }) => {
    photo = photo ? photo : 'https://via.placeholder.com/50'
    return (
        <div style={ { display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 5 } }>
            <div style={ {
                width: 100,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: '1px solid rgba(0, 0, 0, 0.5)',
                borderRadius: 14,
            } }>
                <img style={ { borderRadius: '50%', height: 50 } } src={ photo } alt="senderPhoto"/>
                <span style={ { fontSize: '0.7em' } }>
                    {
                        userName
                    }
                </span>
            </div>

            <span style={ { paddingLeft: 20 } }>{ message }</span>
        </div>
    )
}


const ChatInput: FC<{ callback: (message: string) => void }> = ({ callback }) => {
    const [textAreaValue, setTextAreaValue] = useState( '' )

    const onTextValueChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTextAreaValue( e.currentTarget.value )
    }

    const onKeyPressHandler: KeyboardEventHandler<HTMLTextAreaElement> = e => {
        if (e.code === 'Enter' && e.ctrlKey) {
            callback( textAreaValue )
            setTextAreaValue( '' )
        }
    }

    const onClickHandler: MouseEventHandler<HTMLButtonElement> = e => {
        e.preventDefault()
        callback( textAreaValue )
        setTextAreaValue( '' )
    }

    return (
        <div>
            <textarea value={ textAreaValue } onChange={ onTextValueChangeHandler } onKeyPress={ onKeyPressHandler }/>
            <button onClick={ onClickHandler }>send</button>
        </div>
    )
}