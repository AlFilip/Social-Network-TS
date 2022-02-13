import React, {ChangeEvent, FC, KeyboardEventHandler, MouseEventHandler, useEffect, useState} from 'react'

type ChatInputPropType = {
    callback: (message: string) => void,
    interlocutor: string
}

export const ChatInput: FC<ChatInputPropType> = ({
                                                     callback,
                                                     interlocutor,
                                                 }) => {
    const [textAreaValue, setTextAreaValue] = useState('')

    const onTextValueChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTextAreaValue(e.currentTarget.value)
    }

    const onKeyPressHandler: KeyboardEventHandler<HTMLTextAreaElement> = e => {
        if (e.code === 'Enter' && e.ctrlKey) {
            callback(textAreaValue)
            setTextAreaValue('')
        }
    }

    const onClickHandler: MouseEventHandler<HTMLButtonElement> = e => {
        e.preventDefault()
        callback(textAreaValue)
        setTextAreaValue('')
    }
    useEffect(() => {
        if (interlocutor && !textAreaValue.includes(interlocutor)) {
            setTextAreaValue(`${interlocutor}, ${textAreaValue}`)
        }
    }, [interlocutor])

    return (
        <div>
            <textarea value={textAreaValue}
                      onChange={onTextValueChangeHandler} onKeyPress={onKeyPressHandler}/>
            <button onClick={onClickHandler}>send</button>
        </div>
    )
}