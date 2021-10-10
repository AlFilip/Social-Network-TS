import {UserType} from "../../../redux/usersReducer";
import s from './User.module.css'
import React from "react";

type UserPropsType = UserType & { callBack: (UserId:number) => void }

export const User = ({
                         id,
                         name,
                         photos,
                         status,
                         followed,
                         callBack
                     }: UserPropsType) => {

    const onButtonClick = () => callBack(id)

    return (
        <div className={s.userCard}>
            <div className={s.leftPart}>
                <img
                    src="https://e7.pngegg.com/pngimages/931/209/png-clipart-computer-icons-symbol-avatar-logo-person-with-helmut-miscellaneous-black.png"
                    alt=""/>
                <button onClick={onButtonClick}>{followed ? 'Unfollow' : 'Follow'}</button>
            </div>
            <div className={s.rightPart}>
                <div className={s.name}>{name}</div>
                <div className={s.status}>status: {status}</div>
            </div>
        </div>
    )
}