import React, { Dispatch, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppStateType } from "../../../redux/redux-store"
import { authStateType, initUserData, makeLogout } from "../../../redux/authReducer"
import { NavLink } from "react-router-dom"
import { thunkType } from "../../../redux/usersReducer"


export const LoginForm = () => {
    const { id, login, email, isAuth } = useSelector<AppStateType, authStateType>( state => state.auth )
    const dispatch = useDispatch<Dispatch<thunkType>>()

    useEffect( () => {
        dispatch( initUserData() )
    }, [] )

    const onLogoutButtonClickHandler = () => {
        dispatch( makeLogout() )
    }

    return (
        <div>
            {
                isAuth
                    ?
                    <> { login }
                        <button onClick={ onLogoutButtonClickHandler }>logOut</button>
                    </>
                    : <NavLink to={ `/login` }>Login</NavLink>
            }
        </div>
    )
}