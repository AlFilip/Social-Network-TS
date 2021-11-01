import {followAC, unFollowAC, UsersActionTypes, UserType} from "../../../redux/usersReducer";
import s from './UserCard.module.css'
import React from "react";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Dispatch} from "redux";
import {usersAPI} from "../../../api/usersApi";

type UserPropsType = UserType
const userDefaultImg = "https://e7.pngegg.com/pngimages/931/209/png-clipart-computer-icons-symbol-avatar-logo-person-with-helmut-miscellaneous-black.png"

export const UserCard = React.memo(({
                                        id,
                                        name,
                                        photos,
                                        status,
                                        followed,
                                        // callBack

                                    }: UserPropsType) => {

    const dispatch = useDispatch<Dispatch<UsersActionTypes>>()
    const onClickUnFollow = () => {
        usersAPI.unFollow(id)
            .then(() => {
                dispatch(unFollowAC(id))
            })
    }
    const onClickFollow = () => {
        usersAPI.follow(id)
            .then(() => {
                dispatch(followAC(id))
            })
    }

    const userImg = photos.small ? photos.small : photos.large ? photos.large : userDefaultImg

    return (
        <div className={s.userCard}>
            <div className={s.leftPart}>
                <NavLink to={'profile/' + id}>
                    <img
                        src={userImg}
                        alt=""/>
                </NavLink>
                <button onClick={followed ? onClickUnFollow : onClickFollow}>{followed ? 'UnFollow' : 'Follow'}</button>
            </div>
            <div className={s.rightPart}>
                <div className={s.name}>{name}</div>
                <div className={s.status}>status: {status}</div>
            </div>
        </div>
    )
})