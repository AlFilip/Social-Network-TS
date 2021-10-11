import React, {useEffect} from "react";
import {UsersPropsType} from "./UsersContainer";
import {User} from "./User/User";
import axios from "axios";
import {UserType} from "../../redux/usersReducer";
import {Pagination} from "./Pagination/Paginaton";

type getTasksResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}


export const Users = (props: UsersPropsType) => {

    useEffect(() => {
        axios.get<getTasksResponseType>(`https://social-network.samuraijs.com/api/1.0/users`,
            {
                params: {
                    page: props.currentPage
                }
            })
            .then(response => {
                if (response.status === 200) {
                    props.setUsers(response.data.items, response.data.totalCount)
                }
            })
    }, [props.currentPage])

    const mappedUsers = props.items.map(m => <User key={m.id}
                                                   id={m.id}
                                                   name={m.name}
                                                   photos={m.photos}
                                                   status={m.status}
                                                   followed={m.followed}
                                                   callBack={m.followed ? props.unFollow : props.follow}
    />)

    return (
        <div>
            <div>
                <Pagination currentPage={props.currentPage}
                            totalPagesCount={props.totalPagesCount}
                            callBack={props.setCurrentPage}/>
            </div>
            {mappedUsers}
        </div>
    );
};