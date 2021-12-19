import React, { ChangeEvent, FC, KeyboardEventHandler, MouseEventHandler, useState } from 'react'


export const ChatInput: FC<{ callback: (message: string) => void }> = ({ callback }) => {
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