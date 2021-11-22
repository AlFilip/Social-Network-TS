import React, { useEffect, useMemo } from "react"
import { getUsers, setUsersAC, UserType } from "../../redux/usersReducer"
import { Preloader } from "../Common/Preloader/Preloader"
import { Pagination } from "../Common/Pagination/Paginaton"
import { UserCard } from './UserCard/UserCard'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../redux/redux-store'


export const Users = () => {
    console.log( 'users' )
    const items = useSelector<AppStateType, Array<UserType>>( state => state.users.items )
    const currentPage = useSelector<AppStateType, number>( state => state.users.currentPage )
    const dispatch = useDispatch()

    useEffect( () => {
        dispatch( getUsers( currentPage ) )
        console.log( 'useEffect' )

        // return () => {
        //     dispatch( setUsersAC( [] ) )
        // }
    }, [currentPage] )

    const users = useMemo( () => {
        console.log( 'mapping' )
        return items.map( m => <UserCard key={ m.id }
                                         id={ m.id }
                                         name={ m.name }
                                         photos={ m.photos }
                                         status={ m.status }
                                         followed={ m.followed }
        /> )
    }, [items] )

    return (
        !items.length
            ? <Preloader/>
            : <div>
                <Pagination/>
                <div>
                    { users }
                </div>
            </div>
    )
}
