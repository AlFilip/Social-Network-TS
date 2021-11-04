import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Users} from "./Users";
import {getUsersTC, UserType} from "../../redux/usersReducer";
import React, {useEffect} from "react";
import {Preloader} from "../Common/Preloader/Preloader";


export const UsersContainer = () => {
    const items = useSelector<AppStateType, Array<UserType>>(state => state.users.items)
    const isFetching = useSelector<AppStateType, boolean>(state => state.users.isFetching)
    const currentPage = useSelector<AppStateType, number>(state => state.users.currentPage)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsersTC(currentPage))
    }, [currentPage])

    return (
        isFetching && !items.length
            ? <Preloader/>
            : <Users items={items}
            />
    )
}
