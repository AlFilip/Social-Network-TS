import React, {useMemo} from "react";
import {User} from "./User/User";
import {Pagination} from "./Pagination/Paginaton";
import {UserType} from "../../redux/usersReducer";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Preloader} from "../Common/Preloader/Preloader";

type propsType = {
    follow: (id: number) => void
    unFollow: (id: number) => void
    setCurrentPage: (pageNumber: number) => void
    items: Array<UserType>
    currentPage: number
    totalPagesCount: number
}

export const Users = (props: propsType) => {
    const isFetching = useSelector<AppStateType, boolean>(state => state.users.isFetching)

    const mappedUsers = useMemo(() => props.items.map(m => <User key={m.id}
                                                                 id={m.id}
                                                                 name={m.name}
                                                                 photos={m.photos}
                                                                 status={m.status}
                                                                 followed={m.followed}
                                                                 callBack={m.followed ? props.unFollow : props.follow}
    />), [props.items])

    return (
        <div>
            <div>
                <Pagination currentPage={props.currentPage}
                            totalPagesCount={props.totalPagesCount}
                            callBack={props.setCurrentPage}/>
            </div>
            {isFetching && <Preloader/>}
            {mappedUsers}
        </div>
    )
}
