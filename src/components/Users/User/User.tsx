import {UserType} from "../../../redux/usersReducer";
import s from './User.module.css'
import React from "react";
import {NavLink} from "react-router-dom";

type UserPropsType = UserType & { callBack: (UserId: number) => void }
const userDefaultImg = "https://e7.pngegg.com/pngimages/931/209/png-clipart-computer-icons-symbol-avatar-logo-person-with-helmut-miscellaneous-black.png"

export const User = ({
                         id,
                         name,
                         photos,
                         status,
                         followed,
                         callBack

                     }: UserPropsType) => {

    const onButtonClick = () => callBack(id)
    const userImg = photos.small ? photos.small : photos.large ? photos.large : userDefaultImg

    return (
        <div className={s.userCard}>
            <div className={s.leftPart}>
                <NavLink to={'profile/' + id}>
                    <img
                        src={userImg}
                        alt=""/>
                </NavLink>
                <button onClick={onButtonClick}>{followed ? 'UnFollow' : 'Follow'}</button>
            </div>
            <div className={s.rightPart}>
                <div className={s.name}>{name}</div>
                <div className={s.status}>status: {status}</div>
            </div>
        </div>
    )
}