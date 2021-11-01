import {followAC, unFollowAC, UsersActionTypes, UserType} from "../../../redux/usersReducer";
import React, {useCallback} from "react";
import {useDispatch} from "react-redux";
import {Dispatch} from "redux";
import {usersAPI} from "../../../api/usersApi";
import {UserCard} from "./UserCard";

type UserPropsType = UserType

export const UserCardContainer = React.memo((props: UserPropsType) => {

    const dispatch = useDispatch<Dispatch<UsersActionTypes>>()
    const unFollow = useCallback(() => {
        usersAPI.unFollow(props.id)
            .then(() => {
                dispatch(unFollowAC(props.id))
            })
    }, [dispatch])

    const follow = useCallback(() => {
        usersAPI.follow(props.id)
            .then(() => {
                dispatch(followAC(props.id))
            })
    }, [dispatch])
    const onClickHandler = props.followed ? unFollow : follow

    return <UserCard {...props}
                     callBack={onClickHandler}
    />
})