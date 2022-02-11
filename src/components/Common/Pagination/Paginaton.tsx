import React, { ChangeEventHandler, Dispatch, FormEventHandler, MouseEventHandler, useState } from "react"
import s from './Pagination.module.css'
import { useDispatch, useSelector } from "react-redux"
import { AppStateType } from "../../../redux/redux-store"
import { setCurrentPageAC, UsersActionTypes } from "../../../redux/usersReducer"
import { selectCurrentPage, selectTotalPagesCount } from '../../../redux/selectors'
import { getButtonClassNameHelper, getPrepArray } from './paginationHelpers'




export const Pagination = React.memo( () => {

    const totalPagesCount = useSelector<AppStateType, number>( selectTotalPagesCount )
    const currentPage = useSelector<AppStateType, number>( selectCurrentPage )
    const dispatch = useDispatch<Dispatch<UsersActionTypes>>()

    const [inputValue, setInputValue] = useState<number>( currentPage )

    const setCurrentPage = (pageNumber: number) => {
        dispatch( setCurrentPageAC( pageNumber ) )
    }

    const onClickHandler: MouseEventHandler<HTMLAnchorElement> = (e) => {
        e.preventDefault()
        const pageNumber = +e.currentTarget.id
        setCurrentPage( pageNumber )
        setInputValue( pageNumber )
    }

    const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const refineValue = (value: number): number => {
            if (value < 1) return 1
            if (value > totalPagesCount) return totalPagesCount
            return value
        }
        const value = +e.currentTarget.value
        setInputValue( refineValue( value ) )
    }

    const onSubmitForm: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        setCurrentPage( inputValue )
    }

    const paginationButtons = getPrepArray( totalPagesCount, currentPage, 2, 5 )
        .map( m => (
            <a href={ m.name } key={ m.id } id={ m.id.toString() }
               className={ getButtonClassNameHelper( m.id, currentPage ) }
               onClick={ onClickHandler }
            >
                { m.name }
            </a>
        ) )

    // console.log('pagination')
    return (
        <div className={ s.pagination }>
            <div className={ s.slider }>
                { paginationButtons }
            </div>
            <form onSubmit={ onSubmitForm } className={ s.form }>
                <input value={ inputValue } onChange={ onInputChange } type="number"/>
                <button>Go</button>
            </form>
        </div>
    )
} )
