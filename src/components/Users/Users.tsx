import React, {useMemo} from "react";
import {UserType} from "../../redux/usersReducer";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Preloader} from "../Common/Preloader/Preloader";
import {UserCardContainer} from "./UserCard/UserCardContainer";
import {Pagination} from "../Common/Pagination/Paginaton";

type propsType = {
    items: Array<UserType>
}

export const Users = (props: propsType) => {
    const isFetching = useSelector<AppStateType, boolean>(state => state.users.isFetching)

    const mappedUsers = useMemo(() => props.items.map(m => <UserCardContainer key={m.id}
                                                                              id={m.id}
                                                                              name={m.name}
                                                                              photos={m.photos}
                                                                              status={m.status}
                                                                              followed={m.followed}
    />), [props.items])

    return (
        <div>
            <div>
                <Pagination/>
            </div>
            {isFetching && <Preloader/>}
            {mappedUsers}
        </div>
    )
}
