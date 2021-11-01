import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {Users} from "./Users";
import {
    followAC,
    setCurrentPageAC,
    setIsFetching,
    setTotalItemsCount,
    setUsersAC,
    unFollowAC,
    UsersActionTypes,
    UserType
} from "../../redux/usersReducer";
import React, {useEffect} from "react";
import {Preloader} from "../Common/Preloader/Preloader";
import {usersAPI} from "../../api/usersApi";


export const UsersContainer = () => {
    const items = useSelector<AppStateType, Array<UserType>>(state => state.users.items)
    const currentPage = useSelector<AppStateType, number>(state => state.users.currentPage)
    const isFetching = useSelector<AppStateType, boolean>(state => state.users.isFetching)
    const dispatch = useDispatch<Dispatch<UsersActionTypes>>()
    useEffect(() => {
        dispatch(setIsFetching(true))
        usersAPI.getUsers(currentPage)
            .then(data => {
                if (data) {
                    dispatch(setUsersAC(data.items))
                    dispatch(setTotalItemsCount(data.totalCount))
                    dispatch(setIsFetching(false))
                }
            })
    }, [currentPage])

    return (
        isFetching && !items.length
            ? <Preloader/>
            : <Users items={items}
                     currentPage={currentPage}
            />
    )
}
