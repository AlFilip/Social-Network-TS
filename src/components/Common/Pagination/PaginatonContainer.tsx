import React, {Dispatch, useCallback, useEffect} from "react";
import {
    setCurrentPageAC,
    setIsFetching,
    setTotalItemsCount,
    setUsersAC,
    UsersActionTypes
} from "../../../redux/usersReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {Pagination} from "./Paginaton";
import {usersAPI} from "../../../api/usersApi";


export const PaginationContainer = () => {
    const currentPage = useSelector<AppStateType, number>(state => state.users.currentPage)
    const dispatch = useDispatch<Dispatch<UsersActionTypes>>()

    useEffect(() => {
        dispatch(setIsFetching(true))
        usersAPI.getUsers(currentPage)
            .then(data => {
                if (data) {
                    dispatch(setUsersAC(data.items))
                    dispatch(setTotalItemsCount(data.totalCount))
                }
            })
            .finally(() => {
                dispatch(setIsFetching(false))
            })
    }, [currentPage])

    const setCurrentPage = useCallback((pageNumber: number) => {
        dispatch(setCurrentPageAC(pageNumber))
    }, [dispatch])

    return <Pagination currentPage={currentPage}
                       callBack={setCurrentPage}/>
}
