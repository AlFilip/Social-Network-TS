import React, {useEffect} from "react";
import {UsersPropsType} from "./UsersContainer";
import {User} from "./User/User";


export const Users = (props: UsersPropsType) => {
    const mappedUsers = props.users.map(m => <User key={m.id}
                                                   id={m.id}
                                                   name={m.name}
                                                   photos={m.photos}
                                                   status={m.status}
                                                   followed={m.followed}
                                                   callBack={m.followed ? props.unFollow : props.follow}
    />)
    if (!props.users.length) props.setUsers([
        {
            id: 1,
            name: 'Nastya',
            photos: {small: null, large: null},
            status: 'Hey',
            followed: true
        },
        {
            id: 2,
            name: 'Artem',
            photos: {small: null, large: null},
            status: 'DSFSFD',
            followed: true
        }])
    return (
        <div>
            {mappedUsers}
        </div>
    );
};