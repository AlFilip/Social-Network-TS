import { follow, unFollow, UserType } from "../../../redux/usersReducer"
import s from './UserCard.module.css'
import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { useDispatch } from 'react-redux'


type UserPropsType = UserType & {}
const userDefaultImg = "https://e7.pngegg.com/pngimages/931/209/png-clipart-computer-icons-symbol-avatar-logo-person-with-helmut-miscellaneous-black.png"

export const UserCard = React.memo( ({
                                         id,
                                         name,
                                         photos,
                                         status,
                                         followed,
                                     }: UserPropsType) => {

    const buttonTitle = followed ? 'UnFollow' : 'Follow'
    const userImg = photos.small ? photos.small : photos.large ? photos.large : userDefaultImg
    const [isBtnDisabled, setBtnDisabled] = useState<boolean>( false )
    const dispatch = useDispatch()

    const onClickHandler = () => {
        setBtnDisabled( true )
        dispatch( followed ? unFollow( id ) : follow( id ) )
    }
    useEffect( () => {
        setBtnDisabled( false )
    }, [followed] )

    // console.log( 'userCard  ', id )

    return (
        <div className={ s.userCard }>
            <div className={ s.leftPart }>
                <NavLink to={ 'profile/' + id }>
                    <img
                        src={ userImg }
                        alt=""/>
                </NavLink>
                <button disabled={ isBtnDisabled } onClick={ onClickHandler }>{ buttonTitle }</button>
            </div>
            <div className={ s.rightPart }>
                <div className={ 'name' }>{ name }</div>
                <div className={ s.status }>status: { status }</div>
            </div>
        </div>
    )
} )