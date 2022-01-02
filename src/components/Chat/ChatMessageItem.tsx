import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { chatMessageType } from './Chat'


export const ChatMessageItem: FC<chatMessageType> = ({ userId, message, photo, userName }) => {
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
                <Link to={ '/profile/' + userId }>
                    <img style={ { borderRadius: '50%', height: 50 } } src={ photo } alt="senderPhoto"/>
                </Link>
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