import React, { ChangeEventHandler, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUsers, setSearchParams } from '../../../redux/usersReducer'
import { useAppSelector } from '../../../redux/redux-store'
import { selectUsersSearchTerm } from '../../../redux/selectors'


export const SearchUsers = () => {
    const term = useAppSelector( selectUsersSearchTerm )
    const dispatch = useDispatch()

    const inputChangeHandler: ChangeEventHandler<HTMLInputElement> = e => {
        dispatch( setSearchParams( { term: e.currentTarget.value, currentPage: 1 } ) )
    }

    useEffect( () => {
        const id = setTimeout( () => {
            dispatch( getUsers() )
        }, 800 )
        return () => {
            clearTimeout( id )
        }
    }, [term] )

    return (
        <div>
            <input type="text" value={ term } onChange={ inputChangeHandler } placeholder='Search user'/>
        </div>
    )
}