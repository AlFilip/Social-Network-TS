import {UserType} from "../../../redux/usersReducer";
import s from './UserCard.module.css'
import React from "react";
import {NavLink} from "react-router-dom";

type UserPropsType = UserType & {
    callBack: () => void
    isBtnDisabled: boolean
}
const userDefaultImg = "https://e7.pngegg.com/pngimages/931/209/png-clipart-computer-icons-symbol-avatar-logo-person-with-helmut-miscellaneous-black.png"

export const UserCard = React.memo(({
                                        id,
                                        name,
                                        photos,
                                        status,
                                        followed,
                                        callBack,
                                        isBtnDisabled,
                                    }: UserPropsType) => {

    const buttonTitle = followed ? 'UnFollow' : 'Follow'
    const userImg = photos.small ? photos.small : photos.large ? photos.large : userDefaultImg

    return (
        <div className={s.userCard}>
            <div className={s.leftPart}>
                <NavLink to={'profile/' + id}>
                    <img
                        src={userImg}
                        alt=""/>
                </NavLink>
                <button disabled={isBtnDisabled} onClick={callBack}>{buttonTitle}</button>
            </div>
            <div className={s.rightPart}>
                <div className={s.name}>{name}</div>
                <div className={s.status}>status: {status}</div>
            </div>
        </div>
    )
})