import React, { Dispatch } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppStateType, thunkType } from "../../../redux/redux-store"
import { makeLogout } from "../../../redux/authReducer"
import { NavLink } from "react-router-dom"
import { selectIsAuth, selectIsUserLogin } from '../../../redux/selectors'


export const LoginForm = () => {
    const isAuth = useSelector<AppStateType, boolean>( selectIsAuth )
    const login = useSelector<AppStateType, string | null>( selectIsUserLogin )
    const dispatch = useDispatch<Dispatch<thunkType>>()

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