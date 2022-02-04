import React, {FC} from 'react'
import {Link} from 'react-router-dom'
import {chatMessageType} from './Chat'


export const ChatMessageItem: FC<chatMessageType> = ({userId, message, photo, userName}) => {
    photo = photo ? photo : 'https://via.placeholder.com/50'

    const firstName = userName.split(' ')[0]
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: 5,
            borderBottom: '2px solid rgba(150, 150, 150, 0.2)'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Link to={'/profile/' + userId} style={{width: 50}}>
                    <img style={{borderRadius: '50%',
                        height: 50,
                        width: 50}} src={photo} alt="senderPhoto"/>
                </Link>
                <span style={{fontSize: '0.7em'}}>
                    {
                        firstName.length < 10 ? firstName : firstName.substring(0, 9)
                    }
                </span>
            </div>

            <span style={{paddingLeft: 5, alignSelf: 'flex-start'}}>{message}</span>
        </div>
    )
}