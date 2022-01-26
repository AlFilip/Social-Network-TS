import React, { useEffect, useMemo } from "react"
import { getUsers, setSearchParams, setUsersAC } from "../../redux/usersReducer"
import { Preloader } from "../Common/Preloader/Preloader"
import { Pagination } from "../Common/Pagination/Paginaton"
import { UserCard } from './UserCard/UserCard'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../redux/redux-store'
import { selectCurrentPage, selectItems } from '../../redux/selectors'
import { useLocation } from 'react-router-dom'
import { SearchUsers } from './SearchUsers/SearchUsers'


const Users = () => {
    // console.log( 'users' )
    const items = useAppSelector( selectItems )
    const page = useAppSelector( selectCurrentPage )
    const dispatch = useDispatch()
    const { pathname } = useLocation()

    useEffect( () => {
        const friend = ( pathname === '/friends' || undefined )
        dispatch( setSearchParams( { friend } ) )

        return () => {
            dispatch( setUsersAC( [] ) )
            dispatch( setSearchParams( { friend: undefined, currentPage: 1, term: '' } ) )
        }
    }, [pathname, dispatch] )

    useEffect( () => {
        dispatch( getUsers() )
    }, [page, pathname, dispatch] )

    const users = useMemo( () => {
        // console.log( 'mapping' )
        return items.map( m => <UserCard key={ m.id }
                                         id={ m.id }
                                         name={ m.name }
                                         photos={ m.photos }
                                         status={ m.status }
                                         followed={ m.followed }
        /> )
    }, [items] )

    return (
        <>
            <SearchUsers/>
            {
                !items.length
                    ? <Preloader/>
                    : <div>
                        <div>
                            { users }
                        </div>
                        <Pagination/>
                    </div>
            }
        </>
    )
}

export default Users