import {followAC, unFollowAC, UsersActionTypes, UserType} from "../../../redux/usersReducer";
import s from './UserCard.module.css'
import React from "react";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Dispatch} from "redux";
import axios from "axios";

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
        axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${id}`, {
            withCredentials: true,
            headers: {
                'API-KEY' : '8ac432b4-b12d-401e-8457-1e2c87c081fe'
            }
        })
            .then(res => {
                if (res.status === 200) {
                    dispatch(unFollowAC(id))
                }
            })
            .catch(err => console.log(err))
    }
    const onClickFollow = () => {
        axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${id}`,{}, {
            withCredentials: true,
            headers: {
                "API-KEY" : "8ac432b4-b12d-401e-8457-1e2c87c081fe"
            }
        })
            .then(res => {
                if (res.status === 200) {
                    dispatch(followAC(id))
                }
            })
            .catch(err => console.log(err))
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