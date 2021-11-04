import {followTC, unFollowTC, UserType} from "../../../redux/usersReducer";
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {Dispatch} from "redux";
import {UserCard} from "./UserCard";

type UserPropsType = UserType

export const UserCardContainer = React.memo((props: UserPropsType) => {

    const [isBtnDisabled, setBtnDisabled] = useState<boolean>(false)
    const dispatch = useDispatch<Dispatch<any>>()
    useEffect(() => {
        setBtnDisabled(false)
    }, [props.followed])

    const unFollow = useCallback(() => {
        dispatch(unFollowTC(props.id))
    }, [dispatch])

    const follow = useCallback(() => {
        dispatch(followTC(props.id))
    }, [dispatch])

    const onClickHandler = () => {
        setBtnDisabled(true)
        props.followed ? unFollow() : follow()
    }

    return <UserCard {...props}
                     callBack={onClickHandler}
                     isBtnDisabled={isBtnDisabled}
    />
})