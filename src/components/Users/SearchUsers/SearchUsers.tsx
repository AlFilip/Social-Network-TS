import React, { ChangeEventHandler, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getUsers, setSearchParams } from '../../../redux/usersReducer'
import { useAppSelector } from '../../../redux/redux-store'
import { selectUsersSearchTerm } from '../../../redux/selectors'


export const SearchUsers = () => {
    const term = useAppSelector( selectUsersSearchTerm )
    const [touched, setTouched] = useState( false )
    const dispatch = useDispatch()

    const inputChangeHandler: ChangeEventHandler<HTMLInputElement> = e => {
        dispatch( setSearchParams( { term: e.currentTarget.value, currentPage: 1 } ) )
        if (!touched) {
            setTouched( true )
        }
    }

    useEffect( () => {
        let id: number
        if (touched) {
            id = window.setTimeout( () => {
                dispatch( getUsers() )
            }, 800 )
        }
        return () => {
            id && clearTimeout( id )
        }
    }, [term, touched] )

    return (
        <div>
            <input type="text" value={ term } onChange={ inputChangeHandler } placeholder='Search user'/>
        </div>
    )
}