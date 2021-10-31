import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {Users} from "./Users";
import {
    followAC,
    setCurrentPageAC, setIsFetching,
    setTotalItemsCount,
    setUsersAC,
    unFollowAC,
    UsersActionTypes,
    UserType
} from "../../redux/usersReducer";
import React, {useEffect} from "react";
import axios from "axios";
import {Preloader} from "../Common/Preloader/Preloader";

type getTasksResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

export const UsersContainer = () => {
    const items = useSelector<AppStateType, Array<UserType>>(state => state.users.items)
    const currentPage = useSelector<AppStateType, number>(state => state.users.currentPage)
    const totalPagesCount = useSelector<AppStateType, number>(state => state.users.totalPagesCount)
    const isFetching = useSelector<AppStateType, boolean>(state => state.users.isFetching)
    const dispatch = useDispatch<Dispatch<UsersActionTypes>>()
    useEffect(() => {
        dispatch(setIsFetching(true))
        axios.get<getTasksResponseType>(`https://social-network.samuraijs.com/api/1.0/users`,
            {
                params: {
                    page: currentPage
                },
                withCredentials: true
            })
            .then(response => {
                if (response.status === 200) {
                    dispatch(setUsersAC(response.data.items))
                    dispatch(setTotalItemsCount(response.data.totalCount))
                    dispatch(setIsFetching(false))
                }
            })
    }, [currentPage])
    const follow = (id: number) => {
        dispatch(followAC(id))
    }
    const unFollow = (id: number) => {
        dispatch(unFollowAC(id))
    }
    const setCurrentPage = (pageNumber: number) => {
        dispatch(setCurrentPageAC(pageNumber))
    }

    return (
        isFetching && !items.length
            ? <Preloader/>
            : <Users items={items}
                     currentPage={currentPage}
                     totalPagesCount={totalPagesCount}
                     follow={follow}
                     unFollow={unFollow}
                     setCurrentPage={setCurrentPage}
            />
    )
}
