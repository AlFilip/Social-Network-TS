import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Users} from "./Users";
import {UserType} from "../../redux/usersReducer";
import React from "react";
import {Preloader} from "../Common/Preloader/Preloader";


export const UsersContainer = () => {
    const items = useSelector<AppStateType, Array<UserType>>(state => state.users.items)
    const isFetching = useSelector<AppStateType, boolean>(state => state.users.isFetching)

    return (
        isFetching && !items.length
            ? <Preloader/>
            : <Users items={items}
            />
    )
}
