import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import React, {ChangeEvent, FC, KeyboardEventHandler, MouseEventHandler, useEffect, useState} from 'react'

import s from './ChatInput.module.scss'
import {faRocketchat} from "@fortawesome/free-brands-svg-icons";

type ChatInputPropType = {
    callback: (message: string) => void,
    interlocutor: string
}

export const ChatInput: FC<ChatInputPropType> = ({
                                                     callback,
                                                     interlocutor,
                                                 }) => {
    const [inputValue, setInputValue] = useState('')

    const onTextValueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    const onKeyPressHandler: KeyboardEventHandler<HTMLInputElement> = e => {
        if (e.code === 'Enter' && e.ctrlKey) {
            callback(inputValue)
            setInputValue('')
        }
    }

    const onClickHandler: MouseEventHandler<HTMLButtonElement> = e => {
        e.preventDefault()
        callback(inputValue)
        setInputValue('')
    }
    useEffect(() => {
        if (interlocutor && !inputValue.includes(interlocutor)) {
            setInputValue(`${interlocutor}, ${inputValue}`)
        }
    }, [interlocutor])

    return (
        <div className={s.chatInput}>
            <input type='text'
                   placeholder='type here'
                   value={inputValue}
                   onChange={onTextValueChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={onClickHandler}>
                <FontAwesomeIcon icon={faRocketchat}/>
            </button>
        </div>
    )
}